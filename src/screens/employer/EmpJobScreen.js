import React from "react";
import { Text, StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import Footer from "../../components/Footer";
import EmpAddJobs from "../../components/modals/EmpAddJobs";
import API from "../../constants/API";
import { TouchableHighlight } from "react-native-gesture-handler";

export default class EmpJobScreen extends React.Component {
  _isMounted = false;
  state = {
    isVisible: false,
    jobs: []
  };

  async componentDidMount() {
    this._isMounted = true;
    this.props.navigation.setParams({ onEdit: this.onEdit });
    const { navigation } = this.props;
    const code = navigation.getParam('code');
    const companyId = navigation.getParam('companyId');
    try {
      const apiCallUserJobs = await fetch(`${API.endpoint}/companies/${companyId}/users/${code}/jobs`);
      const jobs = await apiCallUserJobs.json();
      if (this._isMounted) this.setState({ jobs });
    } catch (err) {
      console.log(err);
    }
  }

  componentWillMount() {
    this._isMounted = false;
  }

  _onAdd = () => {
    this.setState({ isVisible: true });
  };

  _onCancel = () => {
    this.setState({ isVisible: false });
  };

  _onDone = async () => {
    const { navigation } = this.props;
    const code = navigation.getParam("code");
    const companyId = navigation.getParam('companyId');
    try {
      const apiCallUserJobs = await fetch(`${API.endpoint}/companies/${companyId}/users/${code}/jobs`);
      const jobs = await apiCallUserJobs.json();
      this.setState({ jobs, isVisible: false });
    } catch (err) {
      console.log(err);
    }
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <TouchableHighlight
          underlayColor="rgba(255, 255, 255, 1);"
          onPress={navigation.getParam("onEdit")}
        >
          <Text style={styles.edit}>Edit</Text>
        </TouchableHighlight>
      )
    };
  };

  onEdit = () => {
    this.setState({ isVisible: true });
  };

  render() {
    const { isVisible, jobs } = this.state;
    const { navigation } = this.props;

    if (!this._isMounted) {
      return null;
    }

    function Item({ jobName }) {
      return (
        <View style={styles.jobName}>
          <Text style={styles.title}>{jobName}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList
            data={jobs}
            renderItem={({ item }) => <Item jobName={item.name} />}
            keyExtractor={item => item.jobId.toString()}
          />
        </SafeAreaView>
        <Footer info={`${jobs.length} Jobs`}/>
        <EmpAddJobs
          isVisible={isVisible}
          cancel={this._onCancel}
          done={this._onDone}
          code={navigation.getParam("code")}
          companyId={navigation.getParam("companyId")}
          existJobs={jobs}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  safeAreaView: {
    flex: 1
  },
  jobName: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "grey",
    paddingRight: 15
  },
  title: {
    fontFamily: "System",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#000000"
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  edit: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#007AFF",
    paddingRight: 10
  }
});
