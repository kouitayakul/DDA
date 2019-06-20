import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import PropTypes from 'prop-types'
import RectangleButton from "../RectangleButton";

const ChangePasswordForm = (props) => {
    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(value) => props.onFormChange("email", value)}
                    placeholder="Email"
                    placeholderTextColor="black"
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(value) => props.onFormChange("oldPassword", value)}
                    placeholder="Temporary password"
                    placeholderTextColor="black"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(value) => props.onFormChange("newPassword", value)}
                    placeholder="New password"
                    placeholderTextColor="black"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(value) => props.onFormChange("confirmNewPassword", value)}
                    placeholder="Confirm new password"
                    placeholderTextColor="black"
                    secureTextEntry
                />
            </View>
            <View style={styles.container}>
                <RectangleButton
                    title="Submit"
                    backgroundColor="#F7971D"
                    onPress={props.onSubmit}
                />
            </View>
        </View>
    );
};

export default ChangePasswordForm;

ChangePasswordForm.propTypes = {
    tempPassword: PropTypes.bool,
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