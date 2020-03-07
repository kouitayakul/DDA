import React from 'react';
import {Text, StyleSheet, SafeAreaView, View, Alert} from 'react-native';
import {Auth} from 'aws-amplify';
import SignUpForm from "../../components/auth/SignUpForm";
import API from '../../constants/API';

export default class EmployerSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            company: '',
            phone: '',
            address: '',
            confirmPassword: '',
            confirmationCode: '',
        };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(field, value) {
        this.setState({[field]: value});
    }

    handleSignUp = async () => {
        const { email, password, name, company, phone, address, confirmPassword} = this.state;
        const { navigation } = this.props;
        try {
            const apiCreateCompany = await fetch(`${API.endpoint}/companies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: company,
                    address,
                }),
            });
            const createdCompany = await apiCreateCompany.json();
            const companyId = createdCompany.insertId.toString();
            console.log(companyId);
            // Make sure passwords match
            if (password === confirmPassword) {
                Auth.signUp({
                    username: email,
                    password,
                    attributes: {
                        email,
                        name,
                        'phone_number': phone,
                        'profile': companyId,
                    },
                })
                // On success, show Alert that says Employer will get a verification link, then navigate to Home.
                .then(() => {
                    Alert.alert(
                        "Employer sign-up pending confirmation.",
                        "A verification email has been sent to the Employer. They may sign in after clicking the verification link.", [{
                            title: "OK",
                            onPress: () => {
                                navigation.navigate('Admin');
                            }
                        }]
                    )
                })
                .catch(err => console.log(err))
            } else {
                alert('Passwords do not match.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{alignSelf: 'stretch'}}>
                    <Text style={styles.titleText}>Enter the desired sign-in credentials for the Employer account</Text>
                    <SignUpForm
                        onFormChange={this.handleFormChange}
                        onSubmit={this.handleSignUp}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 22,
        paddingBottom: 40,
        textAlign: 'center'
    },
});
