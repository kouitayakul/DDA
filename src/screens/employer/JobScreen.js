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

export default class EmployerJobScreen extends Component {
  state = {
    jobs: []
  };

  dim = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  };

  async componentDidMount() {
    try {
      //using company 1 for now
      const apiCallJobs = await fetch(`${API.endpoint}/companies/1/jobs`);
      const jobs = await apiCallJobs.json();
      this.setState({ jobs });
    } catch (err) {
      console.log(err);
    }
  }

  renderContent = () => {
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
              onPress={() => this.editSelectedJobs()}
            >
              <Text style={styles.headerText}>Done</Text>
            </TouchableHighlight>
          }
        />
        <SafeAreaView style={styles.textInputLayout}>
          <TextInput style={styles.textInput} placeholder="Name" />
          <TextInput style={styles.textInput} placeholder="Description" />
        </SafeAreaView>
      </View>
    );
  };

  render() {
    const { jobs } = this.state;
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
        <SlidingUpPanel
          ref={r => (this._showAddJob = r)}
          draggableRange={{
            top: this.dim.height - 200,
            bottom: 0
          }}
        >
          {this.renderContent()}
        </SlidingUpPanel>
        <Footer
          info={`${jobs.length} Jobs`}
          func={() => this._showAddJob.show()}
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
  }
});
