import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import API from "../../constants/API";
import Modal from "react-native-modal";
import { Header } from "react-native-elements";

const windowHeight = Dimensions.get("window").height;

export default class EmpAddJobs extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    cancel: PropTypes.any.isRequired,
    done: PropTypes.any.isRequired,
    code: PropTypes.number.isRequired,
    companyId: PropTypes.number.isRequired,
    existJobs: PropTypes.array.isRequired,
    deletedJob: PropTypes.array,
  };
  state = {
    jobs: [],
    error: null,
    isLoaded: false
  };

  async componentDidMount() {
    const companyId = this.props.companyId;
    try {
      const apiJobs = await fetch(
        `${API.endpoint}/companies/${companyId}/jobs`
      );
      const jobsJson = await apiJobs.json();
      const jobs = jobsJson.map((job) => {
        job.isSelect = false;
        return job;
      });
      this.setState({ jobs, isLoaded: true });
      this.prepExistJobs();
    } catch (error) {
      this.setState({ error });
    }
  }

  prepExistJobs() {
    let existJobs = this.props.existJobs;
    for (let i = 0; i < existJobs.length; i++) {
      let index = this.state.jobs.findIndex(
        (job) => existJobs[i].jobId === job.jobId
      );
      this.state.jobs[index].isSelect = true;
    }
  }

  prepDeletedJobs() {
    let deletedJob = this.props.deletedJob;
    let index = this.state.jobs.findIndex(
      (job) => deletedJob[0].jobId === job.jobId
    );
    this.props.deletedJob.shift();
    this.state.jobs[index].isSelect = false;
  }

  selectItem(job) {
    job.isSelect = !job.isSelect;

    const index = this.state.jobs.findIndex((item) => job.jobId === item.jobId);

    this.state.jobs[index] = job;
    this.setState({
      jobs: this.state.jobs,
    });
  }

  async editSelectedJobs() {
    const { jobs } = this.state;

    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].isSelect) {
        await this.addJobs(jobs[i]);
      }
    }
    this.props.done();
    this.setState({ jobs });
  }

  async addJobs(job) {
    let body = {};

    body.jobId = job.jobId;
    try {
      await fetch(`${API.endpoint}/users/${this.props.code}/jobs`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  onCancel() {
    let { jobs } = this.state;
    let existJobs = this.props.existJobs;

    for (let i = 0; i < jobs.length; i++) {
      let index = existJobs.findIndex((exj) => exj.jobId === jobs[i].jobId);
      if (index === -1) {
        jobs[i].isSelect = false;
      } else {
        jobs[i].isSelect = true;
      }
    }
    this.props.cancel();
  }

  emptyList = () => {
    return <Text style={styles.emptyList}>The list is empty</Text>;
  };

  renderItem(job) {
    return (
      <TouchableOpacity
        onPress={() => this.selectItem(job)}
        disabled={job.isSelect}
      >
        <View style={styles.job}>
          <View>
            <Text style={styles.title}>{job.name}</Text>
          </View>
          <Icon
            name="check-circle"
            style={[
              styles.icon,
              { color: job.isSelect ? "#B6BF00" : "#C7C7CC" },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderHeader = () => {
    return (
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
    );
  };

  render() {
    const { jobs, error, isLoaded } = this.state;
    const { isVisible, deletedJob } = this.props;


    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
      return <Text>Loading...</Text>;
    } else {
                   
      if (deletedJob.length > 0) this.prepDeletedJobs();
                   
      return (
        <Modal isVisible={isVisible} style={styles.modal}>
          <SafeAreaView>
            <View>
              <FlatList
                data={jobs}
                renderItem={({ item }) => this.renderItem(item)}
                ListHeaderComponent={this.renderHeader}
                stickyHeaderIndices={[0]}
                keyExtractor={(item) => item.jobId.toString()}
                extraData={this.state}
                style={{
                  minHeight: windowHeight,
                  backgroundColor: "rgba(255, 255, 255, 0.92)",
                }}
                ListEmptyComponent={this.emptyList()}
              />
            </View>
          </SafeAreaView>
        </Modal>
      );
    }
  }
}

const styles = StyleSheet.create({
  job: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "rgba(128,128,128, 0.2)",
    borderTopWidth: 0.2,
    borderTopColor: "rgba(128,128,128, 0.2)",
    paddingRight: 15,
    paddingTop: 35,
  },
  title: {
    fontFamily: "System",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#000000",
  },
  icon: {
    fontSize: 20,
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
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
});
