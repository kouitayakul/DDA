import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import PropTypes from 'prop-types'
import RectangularButton from "../RectangularButton";

const SignUpForm = (props) => {
    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => props.onFormChange("email", value)}
                    placeholder="Email"
                    placeholderTextColor="black"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => props.onFormChange("password", value)}
                    placeholder="Password"
                    placeholderTextColor="black"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => props.onFormChange("confirmPassword", value)}
                    placeholder="Confirm password"
                    placeholderTextColor="black"
                    secureTextEntry
                />
            </View>
            <View style={styles.container}>
                <RectangularButton
                    title="Submit"
                    backgroundColor="#F7971D"
                    onPress={props.onSubmit}
                />
            </View>
        </View>
    );
};

export default SignUpForm;

SignUpForm.propTypes = {
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        height: 180,
    },
    input: {
        backgroundColor: '#FACA8E',
        width: 300,
        height: 50,
        fontSize: 18,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#F7971D',
        textAlign: 'center'
    }
});