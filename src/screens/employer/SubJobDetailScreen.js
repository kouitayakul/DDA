import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Alert
} from "react-native";
import { Header } from "react-native-elements";
import API from "../../constants/API";
import SlidingUpPanel from "rn-sliding-up-panel";

export default class EmployerSubJobDetailScreen extends Component {
  _isMounted = false;
  state = {
    subJobId: 0,
    jobId: 0,
    subJobTitle: "",
    subJobDescription: "",
    imgLink: "",
    orderNumber: 0,
    error: null
  };

  dim = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  };

  componentDidMount() {
    try {
      this.props.navigation.setParams({ onEdit: this.onEdit });
      const subJob = this.props.navigation.getParam("subJob");
      this._isMounted = true;
      const {
        subJobId,
        jobId,
        title,
        description,
        imgLink,
        orderNumber
      } = subJob;
      this._isMounted = true;
      this.setState({
        subJobId,
        jobId,
        subJobTitle: title,
        subJobDescription: description,
        imgLink,
        orderNumber
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  componentWillMount() {
    this._isMounted = false;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("subJob").title,
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
    this._panelSubJobDetail.show();
  };

  onCancelEdit = () => {
    this._panelSubJobDetail.hide();
    const subJob = this.props.navigation.getParam("subJob");
    const { title, description, imgLink, orderNumber } = subJob;
    this.setState({
      subJobTitle: title,
      subJobDescription: description,
      imgLink,
      orderNumber
    });
  };

  onDoneEdit = async () => {
    let {
      subJobId,
      jobId,
      subJobTitle,
      subJobDescription,
      imgLink,
      orderNumber
    } = this.state;
    const updatedSubJob = {
      subJobId,
      jobId,
      title: subJobTitle,
      description: subJobDescription,
      imgLink,
      orderNumber
    };

    orderNumber = parseInt(orderNumber);
    if (isNaN(orderNumber)) Alert.alert("Please enter a valid number");

    let body = {
      title: subJobTitle,
      description: subJobDescription,
      imgLink,
      orderNumber
    };

    try {
      await fetch(`${API.endpoint}/jobs/${jobId}/subjobs/${subJobId}`, {
        method: "PUT",
        body: JSON.stringify(body)
      });
    } catch (err) {
      console.log(err);
    }
    this._panelSubJobDetail.hide();
    this.props.navigation.setParams({ subJob: updatedSubJob });
  };

  renderContent = () => {
    const { subJobTitle, subJobDescription, imgLink, orderNumber } = this.state;

    return (
      <View style={styles.editContainer}>
        <Header
          backgroundColor="#FFF"
          leftComponent={
            <TouchableHighlight
              underlayColor="#FFF"
              onPress={() => this.onCancelEdit()}
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
        <SafeAreaView style={styles.textInputLayout}>
          <TextInput
            ref={input => (this._title = input)}
            style={styles.textInput}
            defaultValue={subJobTitle}
            onChangeText={subJobTitle => this.setState({ subJobTitle })}
          />
          <TextInput
            ref={input => (this._description = input)}
            style={styles.textInput}
            defaultValue={subJobDescription}
            onChangeText={subJobDescription =>
              this.setState({ subJobDescription })
            }
          />
          <TextInput
            ref={input => (this._ImageLink = input)}
            style={styles.textInput}
            defaultValue={imgLink}
            onChangeText={imgLink => this.setState({ imgLink })}
          />
          <TextInput
            ref={input => (this._orderNumber = input)}
            style={styles.textInput}
            defaultValue={orderNumber.toString()}
            onChangeText={orderNumber => this.setState({ orderNumber })}
          />
        </SafeAreaView>
      </View>
    );
  };

  render() {
    const {
      subJobTitle,
      subJobDescription,
      imgLink,
      orderNumber,
      error
    } = this.state;

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!this._isMounted) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <Text style={styles.textTitle} h2>
            title
          </Text>
          <Text style={styles.textBody} h1>
            {subJobTitle}
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.safeAreaView}>
          <Text style={styles.textTitle} h2>
            description
          </Text>
          <Text style={styles.textBody} h1>
            {subJobDescription}
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.safeAreaView}>
          <Text style={styles.textTitle} h2>
            image link
          </Text>
          <Text style={styles.imgLink} h1>
            {imgLink}
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.safeAreaView}>
          <Text style={styles.textTitle} h2>
            order number
          </Text>
          <Text style={styles.textBody} h1>
            {orderNumber}
          </Text>
        </SafeAreaView>
        <SlidingUpPanel
          ref={r => (this._panelSubJobDetail = r)}
          draggableRange={{
            top: this.dim.height - 100,
            bottom: 0
          }}
          allowDragging={false}
        >
          {this.renderContent()}
        </SlidingUpPanel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 20
  },
  editContainer: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  safeAreaView: {
    marginBottom: 50
  },
  textTitle: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: "#000000"
  },
  textBody: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#000000"
  },
  imgLink: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#007AFF"
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
