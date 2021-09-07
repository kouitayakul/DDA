import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  Dimensions,
  Alert,
  TextInput
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import Icon from "react-native-vector-icons/FontAwesome";
import API from "../../constants/API";
import { Header } from "react-native-elements";
import {Auth} from 'aws-amplify';

export default class SingleUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      editMode: false,
      name: "",
      code: 0,
      stars: 0
    };
  }

  dim = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  };
  async componentWillMount() {
    this.props.navigation.setParams({ onEdit: this.onEdit });
    const user = this.props.navigation.getParam("user");
    const { name, code, stars } = user;
    this.setState({
      name,
      code,
      stars
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("user").name,
      headerBackTitle: navigation.getParam("user").name,
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
    this.setState({ editMode: true });
    this._panelSingleUser.show();
  };

  onCancelEdit = () => {
    this._panelSingleUser.hide();
    const user = this.props.navigation.getParam("user");
    const { name, code, stars } = user;
    this.setState({
      name,
      code,
      stars
    });
  };

  onDoneEdit = async () => {
    let { name, code, stars } = this.state;
    let updatedUser = { name, code, stars };
    stars = parseInt(stars);

    if (isNaN(stars)) {
      Alert.alert("Please enter a valid number");
    } else {
      let body = {
        name,
        stars
      };

      try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.accessToken.jwtToken;
        await fetch(`${API.endpoint}/users/${code}`, {
          method: "PUT",
          headers: { Authorization: token },
          body: JSON.stringify(body)
        });
      } catch (err) {
        Alert.alert(err);
      }
      this._panelSingleUser.hide();
      this.props.navigation.setParams({ user: updatedUser });
    }
  };

  renderContent = () => {
    const { name, stars } = this.state;

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
            style={styles.textInput}
            defaultValue={name}
            onChangeText={name => this.setState({ name })}
          />
          <TextInput
            ref={input => (this._stars = input)}
            style={styles.textInput}
            defaultValue={stars.toString()}
            onChangeText={stars => this.setState({ stars })}
          />
        </SafeAreaView>
      </View>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const { code, name, stars } = this.state;
    const user = { code, name, stars };

    function _onPressEmployers() {
      navigate("SingleUserEmployers", { code: user.code });
    }

    function Employer({ info, items }) {
      const fields = [];
      Object.entries(items).forEach(el => {
        const attrs = el[1].split(".");
        if (info[attrs[0]]) {
          fields.push(
            <View style={styles.item} key={el[0]}>
              <Text style={styles.title}>{el[0]}</Text>
              <Text style={styles.value}>{info[attrs[0]][attrs[1]]}</Text>
            </View>
          );
        }
      });

      return <View style={styles.employer}>{fields}</View>;
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList
            data={[{ user: user }]}
            renderItem={({ item }) => (
              <View>
                <Employer
                  info={item}
                  items={{
                    name: "user.name",
                    code: "user.code",
                    stars: "user.stars"
                  }}
                />
                <TouchableHighlight onPress={_onPressEmployers}>
                  <View style={styles.jobs}>
                    <View>
                      <Text style={styles.jobsTitle}>Employers</Text>
                    </View>
                    <Icon name="angle-right" style={styles.icon} />
                  </View>
                </TouchableHighlight>
              </View>
            )}
            keyExtractor={item => "1"}
          />
          <SlidingUpPanel
            ref={r => (this._panelSingleUser = r)}
            draggableRange={{
              top: this.dim.height - 100,
              bottom: 0
            }}
            onBottomReached={() => {
              this.setState({
                editMode: false
              });
            }}
          >
            {this.renderContent()}
          </SlidingUpPanel>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  editContainer: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch"
  },
  safeAreaView: {
    flex: 1
  },
  jobs: {
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "grey",
    borderTopWidth: 0.3,
    borderTopColor: "grey",
    paddingRight: 15
  },
  jobsTitle: {
    fontFamily: "System",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#000000"
  },
  title: {
    fontFamily: "System",
    fontSize: 14,
    lineHeight: 23,
    letterSpacing: -0.24,
    color: "#000000"
  },
  value: {
    fontFamily: "System",
    fontSize: 18,
    letterSpacing: -0.41,
    color: "#000000"
  },
  icon: {
    fontSize: 20,
    color: "#C7C7CC"
  },
  employer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    paddingLeft: 18,
    paddingTop: 10
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10
  },
  edit: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#007AFF",
    paddingRight: 10
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
