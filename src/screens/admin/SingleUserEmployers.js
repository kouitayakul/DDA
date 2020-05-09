import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import API from "../../constants/API";
import Footer from "../../components/Footer";
import AdminAddEmployers from "../../components/modals/AdminAddEmployers";

export default class SingleUserEmployers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      error: null,
      isLoaded: false,
      isVisible: false
    };
  }

  async componentDidMount() {
    this.props.navigation.setParams({ onEdit: this.onEdit });
    const code = this.props.navigation.getParam("code");
    try {
      const apiCallCompanies = await fetch(
        API.endpoint + `/users/${code}/companies`
      );
      const companies = await apiCallCompanies.json();
      this.setState({
        companies,
        isLoaded: true
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  onEdit = () => {
    this.setState({ isVisible: true });
  };

  _onAdd = () => {
    this.setState({ isVisible: true });
  };

  _onCancel = () => {
    this.setState({ isVisible: false });
  };

  _onDone = async () => {
    const { navigation } = this.props;
    const code = navigation.getParam("code");

    try {
      const apiCallUserCompanies = await fetch(
        `${API.endpoint}/users/${code}/companies`
      );
      const companies = await apiCallUserCompanies.json();
      this.setState({ companies, isVisible: false });
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
      )
    };
  };

  render() {
    const { error, isLoaded, companies, isVisible } = this.state;
    const code = this.props.navigation.getParam("code");
    const { navigate } = this.props.navigation;

    const _onPressButton = company => {
      navigate("SingleUserSingleEmployerJobs", {
        code,
        companyId: company.companyId
      });
    };

    function Item({ title, address, company }) {
      return (
        <TouchableHighlight onPress={() => _onPressButton(company)}>
          <View style={styles.item}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.address}>{address}</Text>
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
            data={companies}
            renderItem={({ item }) => (
              <Item title={item.name} address={item.address} company={item} />
            )}
            keyExtractor={item => item.companyId.toString()}
          />
          <Footer
            info={`${companies.length} ${
              companies.length === 1 ? "Employer" : "Employers"
            }`}
          />
          <AdminAddEmployers
            isVisible={isVisible}
            cancel={this._onCancel}
            done={this._onDone}
            code={this.props.navigation.getParam("code")}
            existEmployers={companies}
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
  address: {
    fontFamily: "System",
    fontSize: 13,
    lineHeight: 18,
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
  }
});
