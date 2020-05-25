import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { Header } from "react-native-elements";
import Footer from "../../components/Footer";
import API from "../../constants/API";
import SlidingUpPanel from "rn-sliding-up-panel";
import Swipeout from "react-native-swipeout";
import Icon from "react-native-vector-icons/FontAwesome";
import {Auth} from 'aws-amplify';

export default class EmployerJobScreen extends Component {
  _isMounted = false;
  state = {
    jobs: [],
    jobName: "",
    jobDescription: "",
    editMode: false
  };

  dim = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  };

  async componentDidMount() {
    try {
      this.props.navigation.setParams({ onEdit: this.onEdit });
      const companyId = this.props.navigation.getParam("companyId");
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.accessToken.jwtToken;
      const apiCallJobs = await fetch(`${API.endpoint}/companies/${companyId}/jobs`, {
        headers: { Authorization: token },
      });
      const jobs = await apiCallJobs.json();
      this._isMounted = true;
      this.setState({ jobs });
    } catch (err) {
      console.log(err);
    }
  }

  componentWillMount() {
    this._isMounted = false;
  }

  onJobPress = jobId => {
    this.props.navigation.navigate("EmployerSubJobs", { jobId });
  };

  Item = (jobName, jobId) => {
    return (
      <TouchableHighlight onPress={() => this.onJobPress(jobId)}>
        <View style={styles.jobName}>
          <Text style={styles.title}>{jobName}</Text>
          <Icon name="angle-right" style={styles.icon} />
        </View>
      </TouchableHighlight>
    );
  };

  ItemEdit = job => {
    const { jobs } = this.state;
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: async () => {
          for (i = 0; i < jobs.length; i++) {
            const { name, description } = jobs[i];
            if (name === job.name && description === job.description) {
              jobs.splice(i, 1);
            }
            this.setState({ jobs });
          }
          try {
            const user = await Auth.currentAuthenticatedUser();
            const token = user.signInUserSession.accessToken.jwtToken;
            await fetch(`${API.endpoint}/jobs/${job.jobId}`, {
              method: "DELETE",
              headers: { Authorization: token }
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
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

  emptyList = () => {
    return <Text style={styles.emptyList}>The list is empty</Text>;
  };

  onCancelAdd = () => {
    this._panelJobs.hide();
    this._name.clear();
    this._description.clear();
  };

  onDoneAdd = async () => {
    const { jobName, jobDescription } = this.state;
    const companyId = this.props.navigation.getParam("companyId");
    let body = {
      name: jobName,
      description: jobDescription,
      companyId
    };

    if (jobName && jobDescription) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.accessToken.jwtToken;
        await fetch(`${API.endpoint}/jobs`, {
          method: "POST",
          headers: { Authorization: token },
          body: JSON.stringify(body)
        });
        const apiCallJobs = await fetch(`${API.endpoint}/companies/${companyId}/jobs`, {
          headers: { Authorization: token }
        });
        const jobs = await apiCallJobs.json();
        this.setState({ jobs });
      } catch (err) {
        console.log(err);
      }
    }

    this._panelJobs.hide();
    this._name.clear();
    this._description.clear();
  };

  onDoneEdit = () => {
    this._panelJobs.hide();
  };

  onEdit = () => {
    this.setState({ editMode: true });
    this._panelJobs.show();
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

  renderContent = () => {
    const { jobs, editMode } = this.state;

    if (!editMode) {
      return (
        <View style={styles.container}>
          <Header
            backgroundColor="#FFF"
            leftComponent={
              <TouchableHighlight
                underlayColor="#FFF"
                onPress={() => this.onCancelAdd()}
              >
                <Text style={styles.headerText}>Cancel</Text>
              </TouchableHighlight>
            }
            rightComponent={
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.92)"
                onPress={() => this.onDoneAdd()}
              >
                <Text style={styles.headerText}>Done</Text>
              </TouchableHighlight>
            }
          />
          <SafeAreaView style={styles.textInputLayout}>
            <TextInput
              ref={input => (this._name = input)}
              style={styles.textInput}
              placeholder="Name"
              onChangeText={jobName => this.setState({ jobName })}
            />
            <TextInput
              ref={input => (this._description = input)}
              style={styles.textInput}
              placeholder="Description"
              onChangeText={jobDescription => this.setState({ jobDescription })}
            />
          </SafeAreaView>
        </View>
      );
    } else {
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
              keyExtractor={item => item.jobId.toString()}
              ListEmptyComponent={this.emptyList()}
            />
          </SafeAreaView>
        </View>
      );
    }
  };

  render() {
    const { jobs } = this.state;

    if (!this._isMounted) {
      return null;
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList
            data={jobs}
            renderItem={({ item }) => this.Item(item.name, item.jobId)}
            keyExtractor={item => item.jobId.toString()}
            ListEmptyComponent={this.emptyList()}
          />
        </SafeAreaView>
        <SlidingUpPanel
          ref={r => (this._panelJobs = r)}
          draggableRange={{
            top: this.dim.height - 100,
            bottom: 0
          }}
          onBottomReached={() => {
            this.setState({ editMode: false, jobName: "", jobDescription: "" });
          }}
        >
          {this.renderContent()}
        </SlidingUpPanel>
        <Footer
          info={`${jobs.length} Jobs`}
          func={() => this._panelJobs.show()}
          iconName={"plus"}
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
  textInputLayout: {
    flex: 1,
    flexDirection: "column",
    marginTop: 40
  },
  textInput: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0.4,
    borderBottomColor: "rgba(0,0,0,0.6)",
    fontSize: 17,
    color: "#000000",
    opacity: 0.6,
    paddingBottom: 7,
    paddingLeft: 4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 40
  },
  headerText: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#007AFF"
  },
  edit: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#007AFF",
    paddingRight: 10
  },
  emptyList: {
    textAlign: "center",
    marginTop: "50%",
    color: "rgba(0,0,0,0.6)"
  },
  icon: {
    fontSize: 20,
    color: "#C7C7CC"
  }
});
