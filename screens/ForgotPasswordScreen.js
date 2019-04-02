import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

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
        console.log("Forgot password for " + this.state.email + ".");
        // TODO: Trigger forgot pass, tell them to check email for temp password.
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