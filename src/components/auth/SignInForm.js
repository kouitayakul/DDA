import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import RectangleButton from "../RectangleButton";

const SignInForm = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(value) => props.onFormChange("email", value)}
                placeholder="Email"
                placeholderTextColor="#CCC"
            />
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(value) => props.onFormChange("password", value)}
                placeholder="Password"
                placeholderTextColor="#CCC"
                secureTextEntry
            />
            <RectangleButton
                title="Login"
                color="#007AFF"
                backgroundColor="#EFEFF4"
                onPress={props.onSubmit}
            />
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
        paddingHorizontal: 16,
        alignSelf: 'stretch'
    },
    input: {
        fontSize: 18,
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        marginBottom: 30
    }
});