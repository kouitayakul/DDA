import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types'

const SignInForm = (props) => {
    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    label="Email"
                    leftIcon={{type: 'font-awesome', name: 'envelope'}}
                    onChangeText={(value) => props.onFormChange("email", value)}
                    placeholder="my@email.com"
                />
                <TextInput
                    style={styles.input}
                    label="Password"
                    leftIcon={{type: 'font-awesome', name: 'lock'}}
                    onChangeText={(value) => props.onFormChange("password", value)}
                    placeholder="p@ssw0rd123"
                    secureTextEntry
                />
            </View>
            <View style={styles.container}>
                {/* TODO: replace with styled button */}
                <Button
                    title='Submit'
                    onPress={props.onSubmit}
                />
            </View>
        </View>
    );
};
export default SignInForm;

SignInForm.propTypes = {
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        height: 120
    },
    input: {
        backgroundColor: '#FACA8E',
        width: 300,
        height: 50,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#F7971D'
    }
});