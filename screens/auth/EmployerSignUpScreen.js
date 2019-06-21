import React from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import SignUpForm from "../../components/auth/SignUpForm";

export default class EmployerSignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            confirmationCode: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    handleSignUp = () => {
        const { email, password, confirmPassword} = this.state;
        // Make sure passwords match
        if (password === confirmPassword) {
            Auth.signUp({
                username: email,
                password,
                attributes: {email},
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
                <Text>Enter the desired sign-in credentials for the Employer account.</Text>
                <SignUpForm
                    onFormChange={this.handleFormChange}
                    onSubmit={this.handleSignUp}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});