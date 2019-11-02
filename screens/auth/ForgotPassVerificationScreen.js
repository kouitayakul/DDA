import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import {Auth} from 'aws-amplify';
import ForgotPassVerificationForm from "../../components/auth/ForgotPassVerificationForm";


export default class ForgotPassVerificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            verificationCode: '',
            newPassword: '',
            confirmNewPassword: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    alertError(error) {
        Alert.alert("Something went wrong, please try again.",
            error.message, [{
                title: "OK",
                onPress: console.log(error),
            }]);
    }

    handleForgotPasswordChange = () => {
        const {email, verificationCode, newPassword, confirmNewPassword} = this.state;
        if (newPassword === confirmNewPassword) {
            Auth.forgotPasswordSubmit(email, verificationCode, confirmNewPassword)
                .then(user => {
                    // at this time the user is logged in if no MFA required
                    Alert.alert("Password changed.",
                        "Your password was successfully updated. You may now sign in using your new password.", [{
                            title: "OK",
                            onPress: () => {
                                this.props.navigation.navigate('Auth')
                            }
                        }])
                }).catch(err => {
                // API call to forgotPasswordSubmit failed
                this.alertError(err);
            });
        } else this.alertError({message: "Passwords do not match."});
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>(logo goes here)</Text>
                <ForgotPassVerificationForm
                    onFormChange={this.handleFormChange}
                    onSubmit={() => this.handleForgotPasswordChange()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallText: {
        fontSize: 14,
    },
    link: {
        color: '#F98C04',
        fontWeight: 'bold',
    },
});