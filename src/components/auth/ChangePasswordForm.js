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
                    placeholderTextColor="#CCC"
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(value) => props.onFormChange("oldPassword", value)}
                    placeholder="Temporary password"
                    placeholderTextColor="#CCC"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(value) => props.onFormChange("newPassword", value)}
                    placeholder="New password"
                    placeholderTextColor="#CCC"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(value) => props.onFormChange("confirmNewPassword", value)}
                    placeholder="Confirm new password"
                    placeholderTextColor="#CCC"
                    secureTextEntry
                />
            </View>
            <View style={styles.container}>
                <RectangleButton
                    title="Submit"
                    backgroundColor="#007AFF"
                    onPress={props.onSubmit}
                />
            </View>
        </View>
    );
};

export default ChangePasswordForm;

ChangePasswordForm.propTypes = {
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