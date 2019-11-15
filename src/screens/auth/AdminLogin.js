import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Auth} from 'aws-amplify';
import SignInForm from "../../components/auth/SignInForm";

export default class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleSignIn = () => {
        Auth.signIn(this.state.email, this.state.password)
            .then(user => this.props.navigation.navigate('Home', {user}))
            .catch(err => console.log(err));
    };

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>(logo goes here)</Text>
                    <SignInForm
                        onFormChange={this.handleFormChange}
                        onSubmit={this.handleSignIn}
                    />
                <View style={styles.smallText}>
                <Text>If you have a temporary password, update it  </Text>
                    <Text style={styles.link} onPress={url => this.props.navigation.navigate('ChangePassword')}>here.</Text>
                </View>
                    <View style={styles.smallText}>
                    <Text>If you have forgotten your password, click </Text>
                    <Text style={styles.link} onPress={() => this.props.navigation.navigate('ForgotPassword')}>here.</Text>
                </View>
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
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    link: {
        color: '#F98C04',
        fontWeight: 'bold',
    },
});