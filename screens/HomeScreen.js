import React from 'react';
import {
    Text,
    Button,
    StyleSheet,
    View,
} from 'react-native';
import { Auth } from 'aws-amplify';



export default class HomeScreen extends React.Component {
    handleSignOut = () => {
        Auth.signOut()
            .then(() => this.props.navigation.navigate('Start'))
            .catch(err => console.log(err));
    };

    render() {
        const user = this.props.navigation.state.params.user;
        const userGroups = user.signInUserSession.accessToken.payload['cognito:groups'];
        let isAdmin = !!(userGroups && userGroups.includes("admin"));
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 24, textAlign: 'center'}}> Admin user? {isAdmin ? "YES" : "NO"}</Text>
                {isAdmin && <Text style={styles.link} onPress={() => this.props.navigation.navigate('EmployerSignUp')}>Click to sign up a new employer.</Text>}
                <Button
                    title="Sign Out"
                    onPress={this.handleSignOut}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginBottom: 20,
        color: 'black',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
    },
    link: {
        marginBottom: 20,
        color: 'purple',
        textDecorationLine: 'underline',
        fontSize: 12,
        lineHeight: 19,
        textAlign: 'center',
    },
});
