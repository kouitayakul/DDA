import React from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Auth} from 'aws-amplify';
import SignInForm from "../../components/auth/SignInForm";
import RectangleButton from '../../components/RectangleButton';
import API from '../../constants/API';

export default class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleSignIn = () => {
        Auth.signIn(this.state.email, this.state.password)
            .then(async (user) => {
                const group = user.signInUserSession.accessToken.payload['cognito:groups'];
                if (group && group[0] === 'Admin') {
                    this.props.navigation.navigate('Admin', {user});
                } else {
                    try {
                        const employer = user.attributes;
                        const apiGetCompany = await fetch(`${API.endpoint}/companies/${employer['profile']}`);
                        const company = await apiGetCompany.json();
                        this.props.navigation.navigate('EmployerHome', { employer, company: company[0] });
                    } catch(err) {
                        console.log(err);
                    }
                }
            })
            .catch(err => {
                Alert.alert(
                    'Unable to Login',
                    err.message,
                    [{text: 'OK'}],
                    {cancelable: false}
                );
            });
    };

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={{width: 159, height: 128, marginTop: 10}}
                    source={require('../../assets/images/logo.png')}
                />
                <View style={{alignSelf: 'stretch'}}>
                    <Text style={styles.titleText}>Admin and Employer Login</Text>
                    <SignInForm
                        onFormChange={this.handleFormChange}
                        onSubmit={this.handleSignIn}
                    />
                    <Text style={[styles.smallText, styles.link]} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot password?</Text>
                    <Text style={[styles.smallText, styles.link]} onPress={() => this.props.navigation.navigate('ChangePassword')}>Update temporary password</Text>
                </View>
                <View style={[styles.smallText, {flexDirection: 'column', marginBottom: 10}]}>
                    <RectangleButton title='User Login' onPress={() => this.props.navigation.navigate('UserLogin')} backgroundColor='#007AFF'/>
                    <Text style={{textAlign:'center', color:'#C7C7CC', paddingTop: 10}}>Jobs West is the supported employment division of the Developmental Disabilities Association.</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 22,
        paddingBottom: 40,
        textAlign: 'center'
    },
    smallText: {
        fontSize: 18,
        paddingTop: 30,
        textAlign: 'center'
    },
    link: {
        color: '#007AFF',
    },
});