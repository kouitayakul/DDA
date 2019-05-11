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
            if (this.state.newPassword === this.state.confirmPassword) {
                Auth.currentAuthenticatedUser()
                    .then(user => {
                        return Auth.changePassword(user, this.state.tempPassword, this.state.newPassword);
                    })
                    .catch(err => console.log(err));
                // TODO: error handling, alert if fail
            }
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