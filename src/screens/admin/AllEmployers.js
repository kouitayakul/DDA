import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList, TouchableHighlight, Dimensions, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../constants/API';
import Footer from '../../components/Footer';
import SlidingUpPanel from "rn-sliding-up-panel";
import { Header } from "react-native-elements";
import SignUpForm from "../../components/auth/SignUpForm";
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
      editMode: false,
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
  
  async componentDidMount() {
    try {
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

  handleFormChange(field, value) {
    this.setState({[field]: value});
  }

  handleSignUp = async () => {
    const { email, password, name, company, phone, address, confirmPassword} = this.state;
    if (!email || !password || !name || !company || !phone || !address || !confirmPassword) {
      alert("Please fill in all required fields");
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
        if (password === confirmPassword) {
          try {
            await Auth.signUp({
              username: email,
              password,
              attributes: {
                email, 
                name, 
                'phone_number': phone, 
                'profile': companyId,
              },
            })
            Alert.alert(
              "Employer sign-up pending confirmation.",
              "A verification email has been sent to the Employer. They may sign in after clicking the verification link.", 
              [{title: "OK"}]
            )
          } catch (err) {
            console.log(err);
            alert(err.message);
            try {
              await fetch(`${API.endpoint}/companies/${companyId}`, {
                method: 'DELETE'
              });
            } catch (err) {
              console.log(err)
            }
          }
        } else {
          alert('Passwords do not match.');
        }
      } catch (err) {
        console.log(err);
        Alert.alert(
          "Employer sign-up failed.",
          err,
          [{title: "OK"}]
        )
      }
    }
  };

  onCancelAdd = () => {
    this._panelUsers.hide();
  };

  onDoneAdd = async () => {
    this._panelUsers.hide();
    await this.handleSignUp();
  }

  renderContent = () => {
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
        <SafeAreaView style={{flex: 1}}>
          <SignUpForm
            onFormChange={this.handleFormChange}
          />
        </SafeAreaView>
      </View>
    );
  }
  
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
            ref={r => (this._panelUsers = r)}
            draggableRange={{
              top: HEIGHT - 100,
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
            info={`${companies.length} ${companies.length === 1 ? 'Employer' : 'Employers'}`}
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
  }
});
