import React from 'react';
import {Text, StyleSheet, View } from 'react-native';
import {Auth} from 'aws-amplify';
import ChangePasswordForm from "../components/auth/ChangePasswordForm";

export default class ChangePasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            tempPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    handlePasswordChange = () => {
        console.log("Change the password for " + this.state.email + ".");
    };

    render() {
        return (
            <View style={styles.container}>
                {/*change to better text*/}
                <Text>Enter your email and temporary password.</Text>
                <ChangePasswordForm
                    onFormChange={this.handleFormChange}
                    onSubmit={() => this.handlePasswordChange()}
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