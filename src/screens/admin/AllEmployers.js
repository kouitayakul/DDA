import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableHighlight, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../constants/API';
import Footer from '../../components/Footer';
import SlidingUpPanel from "rn-sliding-up-panel";
import { Header } from "react-native-elements";
import Swipeout from "react-native-swipeout";
import SignUpForm from "../../components/auth/SignUpForm";
import KeyboardShift from "../../components/KeyboardShift";
import {Auth} from 'aws-amplify';

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default class AllEmployers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      error: null,
      isLoaded: false,
      deleteEmployerMode: false,
      email: "",
      password: "",
      name: "",
      company: "",
      phone: "",
      address: "",
      confirmPassword: "",
      confirmationCode: "",
    }

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

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
  
  async componentDidMount() {
    try {
      this.props.navigation.setParams({ onEdit: this.onEdit });
      const apiCallCompanies = await fetch(API.endpoint + 'companies');
      const companies = await apiCallCompanies.json();
      this.setState({
        companies,
        isLoaded: true,
      });
    }
    catch (error) {
      this.setState({error})
    }
    
  }

  onEdit = () => {
    this.setState({ deleteEmployerMode: true });
    this._panelEmployers.show();
  };

  onDoneEdit = () => {
    this._panelEmployers.hide();
  };

  handleFormChange(field, value) {
    this.setState({[field]: value});
  }

  handleSignUp = async () => {
    const { email, password, name, company, phone, address, confirmPassword} = this.state;
    if (!email || !password || !name || !company || !phone || !address || !confirmPassword) {
      alert("Please fill in all required fields");
    } else if (password != confirmPassword) {
      alert("Passwords do not match")
    } else {
      try {
        const apiCreateCompany = await fetch(`${API.endpoint}/companies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: company,
            address,
          }),
        });
        const createdCompany = await apiCreateCompany.json();
        const companyId = createdCompany.insertId.toString();
        try {
          const userAttributes = {
            username: email,
            password,
            attributes: {
              email, 
              name, 
              'phone_number': phone, 
              'preferred_username': companyId,
            },
          }
          await Auth.signUp(userAttributes);
          Alert.alert(
            "Employer sign-up pending confirmation.",
            "A verification email has been sent to the Employer. They may sign in after clicking the verification link.", 
            [{title: "OK"}]
          )
        } catch (err) {
          alert(err.message);
          try {
            await fetch(`${API.endpoint}/companies/${companyId}`, {
              method: 'DELETE'
            });
          } catch (err) {
            Alert.alert(
              "Employer sign-up failed.",
              err,
              [{title: "OK"}]
            )
          }
        }
      } catch (err) {
        Alert.alert(
          "Employer sign-up failed.",
          err,
          [{title: "OK"}]
        )
      }
    }
  };

  onCancelAdd = () => {
    this._panelEmployers.hide();
  };

  onDoneAdd = async () => {
    this._panelEmployers.hide();
    await this.handleSignUp();
    const apiCallCompanies = await fetch(API.endpoint + 'companies');
    const companies = await apiCallCompanies.json();
    this.setState({ companies });
  }

  renderContent = () => {
    const { companies, deleteEmployerMode } = this.state;

    if (deleteEmployerMode) {
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
          <SafeAreaView style={{flex: 1, zIndex: 10, overflow: "hidden"}}>
            <FlatList
              data={companies}
              renderItem={({ item }) => this.ItemEdit(item)}
              keyExtractor={item => item.companyId.toString()}
              ListEmptyComponent={<Text style={styles.emptyList}>The list is empty</Text>}
            />
          </SafeAreaView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Header
            containerStyle={{zIndex: 20}}
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
                <Text style={styles.headerText}>Create</Text>
              </TouchableHighlight>
            }
          />
          <SafeAreaView style={{flex: 1, zIndex: 10, overflow: "hidden"}}>
            <KeyboardShift>
              {() => (
                <SignUpForm
                  onFormChange={this.handleFormChange}
                />
              )}
            </KeyboardShift>
          </SafeAreaView>
        </View>
      );
    }
  }

  ItemEdit = company => {
    const { companies } = this.state;
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: async () => {
          for (i = 0; i < companies.length; i++) {
            const { companyId, name } = companies[i];
            if (companyId === company.companyId && name === company.name) {
              companies.splice(i, 1);
            }
            this.setState({ companies });
          }
          try {
            await fetch(`${API.endpoint}/companies/${company.companyId}`, {
              method: "DELETE"
            });
            //TODO: add API call to delete user from Cognito as well
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
          <Text style={styles.title}>{company.name}</Text>
        </View>
      </Swipeout>
    );
  };
  
  render() {
    const { error, isLoaded, companies } = this.state;

    const _onPressButton = (company) => {
      this.props.navigation.navigate('EmployerHome', { company });
    };
    
    function Item({ title, address, company }) {
      return (
        <TouchableHighlight onPress={() => _onPressButton(company)}>
          <View style={styles.item}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.address}>{address}</Text>
            </View>
            <Icon name='angle-right' style={styles.icon}/>
          </View>
        </TouchableHighlight>
      );
    };

    if (error) {
      return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={companies}
            renderItem={({ item }) => 
              <Item 
                title={item.name}
                address={item.address}
                company={item}
              />
            }
            keyExtractor={item => item.companyId.toString()}
          />
          <SlidingUpPanel
            ref={r => (this._panelEmployers = r)}
            draggableRange={{
              top: HEIGHT - 100,
              bottom: 0
            }}
            onBottomReached={() => {
              this.setState({
                deleteEmployerMode: false
              });
            }}
          >
            {this.renderContent()}
          </SlidingUpPanel>
          <Footer 
            info={`${companies.length} ${companies.length === 1 ? 'Employer' : 'Employers'}`}
            func={() => this._panelEmployers.show()}
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
    backgroundColor: '#F2F2F2',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'grey',
    paddingRight: 15
  },
  title: {
    fontFamily: 'System',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: "#000000"
  },
  address: {
    fontFamily: 'System',
    fontSize: 13,
    lineHeight: 18,
    color: '#000000'
  },
  icon: {
    fontSize: 20,
    color: '#C7C7CC'
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
});
