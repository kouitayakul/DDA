import React from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import {Auth} from 'aws-amplify';


export default class ForgotPassword extends React.Component {
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
        const email = this.state.email;
        Auth.forgotPassword(email)
            .then(data =>
                Alert.alert(
                    'Verification code sent',
                    'A verification code has been sent to your email.',
                    [{text: 'OK'}],
                    {cancelable: false}
                )
            )
            .catch(err => {
                this.alertError(err);
            });
    }

    alertError(error) {
        Alert.alert("Something went wrong, please try agai",
            error.message, [{
                title: "OK",
                onPress: console.log(error),
            }]);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{width: 159, height: 128}}
                    source={require('../../assets/images/icon.png')}
                />
                <View style={{alignSelf: 'stretch'}}>
                    <ForgotPasswordForm
                        onFormChange={this.handleFormChange}
                        onSubmit={() => this.handleForgotPassword()}
                    />
                    <Text style={[styles.smallText, styles.link]} onPress={() => this.props.navigation.navigate('ForgotPassVerification')}>Already have a verification code?</Text>
                    <Text style={[styles.smallText, styles.link]} onPress={() => this.props.navigation.navigate('AdminLogin')}>Back to login</Text>
                </View>
                <View style={[styles.smallText, {flexDirection: 'column'}]}>
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
        fontSize: 18,
        paddingTop: 30,
        textAlign: 'center'
    },
    link: {
        color: '#007AFF',
    },
});