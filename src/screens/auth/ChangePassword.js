import React from 'react';
import {Image, Text, SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import PropTypes from 'prop-types'
import ChangePasswordForm from "../../components/auth/ChangePasswordForm";


export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            oldPassword: '',
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

    handlePasswordChange = () => {
        const {email, oldPassword, newPassword, confirmNewPassword} = this.state;
        if (newPassword === confirmNewPassword) {
            Auth.signIn(email, oldPassword)
                .then(user => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        Auth.completeNewPassword(
                            user,               // the Cognito User Object
                            newPassword,       // the new password,
                            {email}
                        ).then(user => {
                            // at this time the user is logged in if no MFA required
                            Alert.alert("Password changed.",
                                "Your password was successfully updated. You may now sign in using your new password.", [{
                                    title: "OK",
                                    onPress: () => {
                                        this.props.navigation.navigate('Auth')
                                    }
                                }])
                        }).catch(err => {
                            // API call to completeNewPassword failed
                            this.alertError(err);
                        });
                    } else this.alertError({message: "Temporary password has already been updated."})
                }).catch(err => {
                // API call to SignIn failed
                this.alertError(err)
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
                    <Text style={styles.titleText}>Update Temporary Password</Text>
                    <ChangePasswordForm
                        onFormChange={this.handleFormChange}
                        onSubmit={() => this.handlePasswordChange()}
                    />
                    <Text style={[styles.smallText, styles.link]} onPress={() => this.props.navigation.navigate('AdminLogin')}>Back to login</Text>
                </View>
                <View style={[styles.smallText, {flexDirection: 'column', marginBottom: 10}]}>
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
        paddingTop: 80,
        paddingBottom: 48
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