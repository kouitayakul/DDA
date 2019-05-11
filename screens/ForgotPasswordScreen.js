import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import { Auth } from 'aws-amplify';


export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    handleForgotPassword() {
        Auth.forgotPassword(this.state.email)
            .then(data => console.log(data))
            // TODO: alert user email has been sent with code,
            //  navigate user to form where they can enter code and change password
            .catch(err => console.log(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>(logo goes here)</Text>
                <ForgotPasswordForm
                    onFormChange={this.handleFormChange}
                    onSubmit={() => this.handleForgotPassword()}
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
});