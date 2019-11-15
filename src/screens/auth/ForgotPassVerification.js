import React from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import {Auth} from 'aws-amplify';
import ForgotPassVerificationForm from "../../components/auth/ForgotPassVerificationForm";


export default class ForgotPassVerification extends React.Component {
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
            <SafeAreaView style={styles.container}>
                <Image
                    style={{width: 159, height: 128, marginTop: 10}}
                    source={require('../../assets/images/logo.png')}
                />
                <View style={{alignSelf: 'stretch'}}>
                    <Text style={styles.titleText}>Forgot Password Verification Code</Text>
                    <ForgotPassVerificationForm
                        onFormChange={this.handleFormChange}
                        onSubmit={() => this.handleForgotPasswordChange()}
                    />
                    <Text style={[styles.smallText, styles.link]} onPress={() => this.props.navigation.navigate('AdminLogin')}>Back to login</Text>
                </View>
                <View style={[styles.smallText, {flexDirection: 'column'}]}>
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