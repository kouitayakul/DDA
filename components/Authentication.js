import React from 'react';
import {StyleSheet, Text, View, Alert, Modal} from 'react-native';
import {Input, Button, ButtonGroup} from 'react-native-elements';
import {Auth} from 'aws-amplify';
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";

export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            confirmationCode: '',
            modalVisible: false,
            selectedIndex: 0,
        };

        this.buttons = ['Sign Up', 'Sign In'];
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    updateIndex = () => {
        const newIndex = this.state.selectedIndex === 0 ? 1 : 0;
        this.setState({selectedIndex: newIndex});
    };

    handleSignIn = () => {
        const {email, password} = this.state;
        Auth.signIn(email, password)
            .then(user => this.props.navigation.navigate('Home', {user}))
            .catch(err => console.log(err));
    };

    handleConfirmationCode = () => {
        const {email, confirmationCode} = this.state;
        Auth.confirmSignUp(email, confirmationCode, {})
            .then((user) => {
                Alert.alert("Sign-up confirmed!", "You may now sign in.", [{
                    title: "OK",
                    onPress: () => {
                        this.setState({modalVisible: false});
                        this.props.navigation.navigate('Authorization')
                    }
                }])
            })
            .catch(err => console.log(err));
    };

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    handleSignUp = () => {
        const {email, password, confirmPassword} = this.state;
        // Make sure passwords match
        if (password === confirmPassword) {
            Auth.signUp({
                username: email,
                password,
                attributes: {email},
            })
            // On success, show Confirmation Code Modal
                .then(() => this.setState({modalVisible: true}))
                .catch(err => console.log(err));
        } else {
            alert('Passwords do not match.');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to DDA!</Text>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={this.buttons}
                />
                {this.state.selectedIndex === 0 ? (
                    <SignUp
                        onFormChange={this.handleFormChange}
                        onSubmit={this.handleSignUp}
                    />
                ) : (
                    <SignIn
                        onFormChange={this.handleFormChange}
                        onSubmit={this.handleSignIn}
                    />
                )}
                <Modal visible={this.state.modalVisible}>
                    <View style={styles.container}>
                        <Input
                            label="Confirmation Code"
                            leftIcon={{type: 'font-awesome', name: 'lock'}}
                            onChangeText={(value) => this.setState({confirmationCode: value})}
                        />
                        <Button title='Submit' onPress={this.handleConfirmationCode}/>
                    </View>
                </Modal>
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