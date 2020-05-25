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

export default class EmployerSubJobScreen extends Component {
  _isMounted = false;
  state = {
    subJobs: [],
    jobId: 0,
    subJobTitle: "",
    subJobDescription: "",
    imgLink: "",
    orderNumber: 0,
    editMode: false,
    error: null
  };

  dim = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  };

  async componentDidMount() {
    try {
      this.props.navigation.setParams({ onEdit: this.onEdit });
      const jobId = this.props.navigation.getParam("jobId");
      const apiCallSubJobs = await fetch(
        `${API.endpoint}/jobs/${jobId}/subjobs`
      );
      const subJobs = await apiCallSubJobs.json();
      this._isMounted = true;
      this.setState({ subJobs, jobId });
    } catch (error) {
      this.setState({ error });
    }
    // Updated subjob(s) needs to be re-fetch when user comes back from SubJobDetailScreen
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      async () => {
        try {
          const jobId = this.props.navigation.getParam("jobId");
          const apiCallSubJobs = await fetch(
            `${API.endpoint}/jobs/${jobId}/subjobs`
          );
          const subJobs = await apiCallSubJobs.json();
          this.setState({
            subJobs
          });
        } catch (error) {
          this.setState({ error });
        }
      }
    );
  }

  componentWillMount() {
    this._isMounted = false;
  }

  onJobPress = subJob => {
    const title = subJob.title;
    this.props.navigation.navigate("EmployerSubJobsDetail", { subJob, title });
  };

  Item = subJob => {
    return (
      <TouchableHighlight onPress={() => this.onJobPress(subJob)}>
        <View style={styles.subJobTitle}>
          <Text style={styles.title}>{subJob.title}</Text>
          <Icon name="angle-right" style={styles.icon} />
        </View>
      </TouchableHighlight>
    );
  };

  ItemEdit = subJob => {
    const { subJobs } = this.state;

    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: async () => {
          for (i = 0; i < subJobs.length; i++) {
            const { jobId, title, description } = subJobs[i];
            if (
              jobId === subJob.jobId &&
              title === subJob.title &&
              description === subJob.description
            ) {
              subJobs.splice(i, 1);
            }
            this.setState({ subJobs });
          }
          try {
            const user = await Auth.currentAuthenticatedUser();
            const token = user.signInUserSession.accessToken.jwtToken;
            await fetch(
              `${API.endpoint}/jobs/${subJob.jobId}/subjobs/${subJob.subJobId}`,
              {
                method: "DELETE",
                headers: { Authorization: token },
              }
            );
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
        <View style={styles.subJobTitle}>
          <Text style={styles.title}>{subJob.title}</Text>
        </View>
      </Swipeout>
    );
  };

  emptyList = () => {
    return <Text style={styles.emptyList}>The list is empty</Text>;
  };

  onCancelAdd = () => {
    this._panelSubJobs.hide();
    this._title.clear();
    this._description.clear();
    this._ImageLink.clear();
    this._orderNumber.clear();
  };

  onDoneAdd = async () => {
    const {
      subJobTitle,
      subJobDescription,
      imgLink,
      orderNumber,
      jobId
    } = this.state;
    let body = {
      title: subJobTitle,
      description: subJobDescription,
      imgLink,
      orderNumber,
      jobId
    };

    if (subJobTitle && subJobDescription && imgLink && orderNumber) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.accessToken.jwtToken;
        await fetch(`${API.endpoint}/jobs/${jobId}/subjobs`, {
          method: "POST",
          headers: { Authorization: token },
          body: JSON.stringify(body)
        });
        const apiCallJobs = await fetch(
          `${API.endpoint}/jobs/${jobId}/subjobs`
        );
        const subJobs = await apiCallJobs.json();
        this.setState({ subJobs });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please fill all fields');
    }

    this._panelSubJobs.hide();
    this._title.clear();
    this._description.clear();
    this._ImageLink.clear();
    this._orderNumber.clear();
  };

  onDoneEdit = () => {
    this._panelSubJobs.hide();
  };

  onEdit = () => {
    this.setState({ editMode: true });
    this._panelSubJobs.show();
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
    const { subJobs, editMode } = this.state;

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
              ref={input => (this._title = input)}
              style={styles.textInput}
              placeholder="Title"
              onChangeText={subJobTitle => this.setState({ subJobTitle })}
            />
            <TextInput
              ref={input => (this._description = input)}
              style={styles.textInput}
              placeholder="Description"
              onChangeText={subJobDescription =>
                this.setState({ subJobDescription })
              }
            />
            <TextInput
              ref={input => (this._ImageLink = input)}
              style={styles.textInput}
              placeholder="Image Link"
              onChangeText={imgLink => this.setState({ imgLink })}
            />
            <TextInput
              ref={input => (this._orderNumber = input)}
              style={styles.textInput}
              placeholder="Order Number"
              onChangeText={orderNumber => this.setState({ orderNumber })}
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
              data={subJobs}
              renderItem={({ item }) => this.ItemEdit(item)}
              keyExtractor={item => item.subJobId.toString()}
              ListEmptyComponent={this.emptyList()}
            />
          </SafeAreaView>
        </View>
      );
    }
  };

  render() {
    const { subJobs, error } = this.state;

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!this._isMounted) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList
            data={subJobs}
            renderItem={({ item }) => this.Item(item)}
            keyExtractor={item => item.subJobId.toString()}
            ListEmptyComponent={this.emptyList()}
          />
        </SafeAreaView>
        <SlidingUpPanel
          ref={r => (this._panelSubJobs = r)}
          draggableRange={{
            top: this.dim.height - 100,
            bottom: 0
          }}
          onBottomReached={() => {
            this.setState({
              editMode: false,
              subJobTitle: "",
              subJobDescription: ""
            });
          }}
        >
          {this.renderContent()}
        </SlidingUpPanel>
        <Footer
          info={`${subJobs.length} SubJobs`}
          func={() => this._panelSubJobs.show()}
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
  subJobTitle: {
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
