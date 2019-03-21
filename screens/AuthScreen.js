import React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import {Auth} from 'aws-amplify';
import SignInForm from "../components/auth/SignInForm";

export default class AuthScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleSignIn = () => {
        const {email, password} = this.state;
        Auth.signIn(email, password)
            .then(user => this.props.navigation.navigate('Home', {user}))
            .catch(err => console.log(err));
    };

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to DDA!</Text>
                    <SignInForm
                        onFormChange={this.handleFormChange}
                        onSubmit={this.handleSignIn}
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