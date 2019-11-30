import React from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import SignUpForm from "../../components/auth/SignUpForm";

export default class EmployerSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            company: '',
            phone: '',
            address: '',
            confirmPassword: '',
            confirmationCode: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    handleSignUp = () => {
        const { email, password, name, company, phone, address, confirmPassword} = this.state;
        const testObj = {
            username: email,
            password,
            attributes: {
                email,
                'custom:name': name,
                'custom:company': company,
                'custom:phone': phone,
                'custom:address': address
            },
        };
        console.log(testObj);
        // Make sure passwords match
        if (password === confirmPassword) {
            Auth.signUp({
                username: email,
                password,
                attributes: {
                    email,
                    'custom:name': name,
                    'custom:company': company,
                    'custom:phone': phone,
                    'custom:address': address
                },
            })
            // On success, show Alert that says Employer will get a verification link, then navigate to Home.
                .then(() => {
                    Alert.alert("Employer sign-up pending confirmation.",
                        "A verification email has been sent to the Employer. They may sign in after clicking the verification link.", [{
                            title: "OK",
                            onPress: () => {
                                this.props.navigation.navigate('Start')
                            }
                        }])
                })
                .catch(err => console.log(err))
        } else {
            alert('Passwords do not match.');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.instruction}>
                    <Text style={{fontSize: 20}}>Enter the desired sign-in credentials for the Employer account</Text>
                </View>
                <View style={styles.signUpForm}>
                    <SignUpForm
                        onFormChange={this.handleFormChange}
                        onSubmit={this.handleSignUp}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    instruction: {
        flex: 1, 
        justifyContent: 'flex-end',
        marginTop: 60
    },
    signUpForm: {
        flex: 7,
    }
});
