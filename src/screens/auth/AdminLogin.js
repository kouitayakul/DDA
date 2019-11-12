import React from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {Auth} from 'aws-amplify';
import SignInForm from "../../components/auth/SignInForm";
import RectangleButton from '../../components/RectangleButton'

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
            .then(user => {
                this.props.navigation.navigate('Home', {user});
                console.log(user);
            })
            .catch(err => {
                Alert.alert(
                    'Unable to Login',
                    err.message,
                    [{text: 'OK'}],
                    {cancelable: false}
                );
            });

        
    };

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{width: 159, height: 128}}
                    source={require('../../assets/images/icon.png')}
                />
                <View>
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
                <View style={[styles.smallText, {flexDirection: 'column'}]}>
                    <RectangleButton title='User Login' onPress={() => this.props.navigation.navigate('UserLogin')} backgroundColor='#007AFF'/>
                    <Text style={{textAlign:'center', color:'#C7C7CC', paddingTop: 10}}>Jobs West is the supported employment division of the Developmental Disabilities Association.</Text>
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
        justifyContent: 'space-between',
        paddingTop: 80,
        paddingBottom: 48
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
        color: '#007AFF',
        fontWeight: 'bold',
    },
});