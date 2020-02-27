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

export default class EmployerJobScreen extends Component {
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
      //using company 2 for now
      const apiCallJobs = await fetch(`${API.endpoint}/companies/2/jobs`);
      const jobs = await apiCallJobs.json();
      this.setState({ jobs });
    } catch (err) {
      console.log(err);
    }
  }

  Item = jobName => {
    return (
      <View style={styles.jobName}>
        <Text style={styles.title}>{jobName}</Text>
      </View>
    );
  };

  ItemEdit = job => {
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: async () => {
          try {
            await fetch(`${API.endpoint}/jobs/${job.jobId}`, {
              method: "DELETE"
            });
          } catch (err) {
            console.log(err);
          }
          await this.componentDidMount();
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

  onCancel = () => {
    this.setState({ editMode: false });
    this._panelJobs.hide();
  };

  onDoneAdd = async () => {
    const { jobName, jobDescription } = this.state;
    let body = {
      name: jobName,
      description: jobDescription,
      // using company 2 for now
      companyId: 2
    };

    try {
      await fetch(`${API.endpoint}/jobs`, {
        method: "POST",
        body: JSON.stringify(body)
      });
      await this.componentDidMount();
    } catch (err) {
      console.log(err);
    }
    this._panelJobs.hide();
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
            backgroundColor="rgb(255, 255, 255)"
            leftComponent={
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.92)"
                onPress={() => this.onCancel()}
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
              style={styles.textInput}
              placeholder="Name"
              onChangeText={jobName => this.setState({ jobName })}
            />
            <TextInput
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
            backgroundColor="rgb(255, 255, 255)"
            leftComponent={
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.92)"
                onPress={() => this.onCancel()}
              >
                <Text style={styles.headerText}>Cancel</Text>
              </TouchableHighlight>
            }
            rightComponent={
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.92)"
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
            />
          </SafeAreaView>
        </View>
      );
    }
  };

  render() {
    const { jobs } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList
            data={jobs}
            renderItem={({ item }) => this.Item(item.name)}
            keyExtractor={item => item.jobId.toString()}
          />
        </SafeAreaView>
        <SlidingUpPanel
          ref={r => (this._panelJobs = r)}
          draggableRange={{
            top: this.dim.height - 200,
            bottom: 0
          }}
          onBottomReached={() => {
            this.setState({ editMode: false });
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
  }
});
