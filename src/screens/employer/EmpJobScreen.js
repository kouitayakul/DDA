import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import Footer from "../../components/Footer";
import EmpAddJobs from "../../components/modals/EmpAddJobs";
import API from "../../constants/API";
import { TouchableHighlight } from "react-native-gesture-handler";
import SlidingUpPanel from "rn-sliding-up-panel";
import Swipeout from "react-native-swipeout";
import { Header } from "react-native-elements";

export default class EmpJobScreen extends React.Component {
  _isMounted = false;
  state = {
    isVisible: false,
    jobs: [],
    deletedJob: [],
    error: null,
    isLoaded: false,
  };

  dim = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  };

  async componentDidMount() {
    this.props.navigation.setParams({ onEdit: this.onEdit });
    const { navigation } = this.props;
    const code = navigation.getParam("code");
    const companyId = navigation.getParam("companyId");
    try {
      const apiCallUserJobs = await fetch(
        `${API.endpoint}/companies/${companyId}/users/${code}/jobs`
      );
      const jobs = await apiCallUserJobs.json();
      this.setState({ jobs, isLoaded: true });
    } catch (error) {
      this.setState({ error });
    }
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
    const companyId = navigation.getParam("companyId");
    try {
      const apiCallUserJobs = await fetch(
        `${API.endpoint}/companies/${companyId}/users/${code}/jobs`
      );
      const jobs = await apiCallUserJobs.json();
      this.setState({ jobs, isVisible: false });
    } catch (error) {
      this.setState({ error });
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
      ),
    };
  };

  ItemEdit = (job) => {
    const { jobs, deletedJob } = this.state;
    const code = this.props.navigation.getParam("code");
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: async () => {
          for (i = 0; i < jobs.length; i++) {
            const { jobId } = jobs[i];
            if (jobId === job.jobId) {
              deletedJob.push(jobs[i]);
              jobs.splice(i, 1);
            }
            this.setState({ jobs, deletedJob });
          }
          let body = {};
          body.jobId = job.jobId;
          try {
            await fetch(`${API.endpoint}/users/${code}/jobs`, {
              method: "DELETE",
              body: JSON.stringify(body),
            });
          } catch (error) {
            this.setState({ error });
          }
        },
      },
    ];

    return (
      <Swipeout
        right={swipeBtns}
        autoClose={true}
        backgroundColor="transparent"
      >
        <View style={styles.jobName}>
          <Text style={styles.title}>{job.name}</Text>
        </View>
      </Swipeout>
    );
  };

  Item = (jobName) => {
    return (
      <View style={styles.jobName}>
        <Text style={styles.title}>{jobName}</Text>
      </View>
    );
  };

  onEdit = () => {
    this._panelJobs.show();
  };

  onDoneEdit = () => {
    this._panelJobs.hide();
  };

  emptyList = () => {
    return <Text style={styles.emptyList}>The list is empty</Text>;
  };

  renderContent = () => {
    const { jobs } = this.state;

    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#FFF"
          rightComponent={
            <TouchableHighlight
              underlayColor="#FFF"
              onPress={() => this.onDoneEdit()}
            >
              <Text style={styles.headerText}>Done</Text>
            </TouchableHighlight>
          }
        />
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList
            data={jobs}
            renderItem={({ item }) => this.ItemEdit(item)}
            keyExtractor={(item) => item.jobId.toString()}
            ListEmptyComponent={this.emptyList()}
          />
        </SafeAreaView>
      </View>
    );
  };

  render() {
    const { isVisible, jobs, deletedJob, error, isLoaded } = this.state;
    const { navigation } = this.props;

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.safeAreaView}>
            <FlatList
              data={jobs}
              renderItem={({ item }) => this.Item(item.name)}
              keyExtractor={(item) => item.jobId.toString()}
              ListEmptyComponent={this.emptyList()}
            />
          </SafeAreaView>
          <Footer
            info={`${jobs.length} ${jobs.length === 1 ? "Job" : "Jobs"}`}
            func={() => this._onAdd()}
            iconName={"plus"}
          />
          <EmpAddJobs
            isVisible={isVisible}
            cancel={this._onCancel}
            done={this._onDone}
            code={navigation.getParam("code")}
            companyId={navigation.getParam("companyId")}
            existJobs={jobs}
            deletedJob={deletedJob}
          />
          <SlidingUpPanel
            ref={(r) => (this._panelJobs = r)}
            draggableRange={{
              top: this.dim.height - 100,
              bottom: 0,
            }}
          >
            {this.renderContent()}
          </SlidingUpPanel>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  safeAreaView: {
    flex: 1,
  },
  jobName: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "grey",
    paddingRight: 15,
  },
  title: {
    fontFamily: "System",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#000000",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  edit: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#007AFF",
    paddingRight: 10,
  },
  headerText: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#007AFF",
  },
  emptyList: {
    textAlign: "center",
    marginTop: "50%",
    color: "rgba(0,0,0,0.6)",
  },
  item: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "grey",
    paddingRight: 15,
  },
});
