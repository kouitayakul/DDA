import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  AsyncStorage,
  Dimensions,
  TextInput,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import API from "../../constants/API";
import Footer from "../../components/Footer";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Header } from "react-native-elements";
import Swipeout from "react-native-swipeout";

export default class AllUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      error: null,
      isLoaded: false,
      editMode: false,
      code: "",
      name: "",
      stars: 0
    };
  }

  dim = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  };

  async componentDidMount() {
    try {
      this.props.navigation.setParams({ onEdit: this.onEdit });
      const apiCallUsers = await fetch(API.endpoint + "users");
      const users = await apiCallUsers.json();
      this.setState({
        users,
        isLoaded: true
      });
    } catch (error) {
      this.setState({ error });
    }
    // Updated user(s) needs to be re-fetch when user comes back from SingleUser
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      async () => {
        try {
          const apiCallUsers = await fetch(API.endpoint + "users");
          const users = await apiCallUsers.json();
          this.setState({
            users
          });
        } catch (error) {
          this.setState({ error });
        }
      }
    );
  }

  _storeData = async code => {
    try {
      await AsyncStorage.setItem("userCode", code);
    } catch (err) {
      console.log(err);
    }
  };

  onEdit = () => {
    this.setState({ editMode: true });
    this._panelUsers.show();
  };

  onDoneEdit = () => {
    this._panelUsers.hide();
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

  ItemEdit = user => {
    const { users } = this.state;
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: async () => {
          for (i = 0; i < users.length; i++) {
            const { name, code } = users[i];
            if (name === user.name && code === user.code) {
              users.splice(i, 1);
            }
            this.setState({ users });
          }
          try {
            await fetch(`${API.endpoint}/users/${user.code}`, {
              method: "DELETE"
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
        <View style={styles.item}>
          <Text style={styles.title}>{user.name}</Text>
        </View>
      </Swipeout>
    );
  };

  emptyList = () => {
    return <Text style={styles.emptyList}>The list is empty</Text>;
  };

  onCancelAdd = () => {
    this._panelUsers.hide();
    this._code.clear();
    this._name.clear();
  };

  onDoneAdd = async () => {
    let { code, name, stars } = this.state;
    code = parseInt(code);

    if (isNaN(code)) {
      Alert.alert("Please enter a valid code");
    } else {
      let body = {
        code,
        name,
        stars
      };

      if (code && name) {
        try {
          await fetch(`${API.endpoint}/users`, {
            method: "POST",
            body: JSON.stringify(body)
          });
          const apiCallUsers = await fetch(`${API.endpoint}/users`);
          const users = await apiCallUsers.json();
          this.setState({ users });
        } catch (err) {
          console.log(err);
        }
      }

      this._panelUsers.hide();
      this._code.clear();
      this._name.clear();
    }
  };

  renderContent = () => {
    const { users, editMode } = this.state;

    if (editMode) {
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
              data={users}
              renderItem={({ item }) => this.ItemEdit(item)}
              keyExtractor={item => item.code.toString()}
              ListEmptyComponent={this.emptyList()}
            />
          </SafeAreaView>
        </View>
      );
    } else {
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
              ref={input => (this._code = input)}
              style={styles.textInput}
              placeholder="Please enter a 4 digits code"
              onChangeText={code => this.setState({ code })}
            />
            <TextInput
              ref={input => (this._name = input)}
              style={styles.textInput}
              placeholder="Name"
              onChangeText={name => this.setState({ name })}
            />
          </SafeAreaView>
        </View>
      );
    }
  };

  render() {
    const { error, isLoaded, users } = this.state;

    const _onPressButton = async user => {
      this.props.navigation.navigate("SingleUser", { user });
    };

    function Item({ user }) {
      return (
        <TouchableHighlight onPress={() => _onPressButton(user)}>
          <View style={styles.item}>
            <View>
              <Text style={styles.title}>{user.name}</Text>
            </View>
            <Icon name="angle-right" style={styles.icon} />
          </View>
        </TouchableHighlight>
      );
    }

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={users}
            renderItem={({ item }) => <Item user={item} />}
            keyExtractor={item => item.code.toString()}
          />
          <SlidingUpPanel
            ref={r => (this._panelUsers = r)}
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
          <Footer
            info={`${users.length} Jobs`}
            func={() => this._panelUsers.show()}
            iconName={"plus"}
          />
        </SafeAreaView>
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
    alignItems: "stretch"
  },
  safeAreaView: {
    flex: 1
  },
  item: {
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
  icon: {
    fontSize: 20,
    color: "#C7C7CC"
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
  headerText: {
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
    opacity: 0.6,
    paddingBottom: 7,
    paddingLeft: 4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 40
  }
});
