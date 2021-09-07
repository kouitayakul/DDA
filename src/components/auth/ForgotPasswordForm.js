import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import RectangleButton from "../RectangleButton";

const ForgotPasswordForm = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(value) => props.onFormChange("email", value)}
                placeholder="Email"
                placeholderTextColor="#CCC"
            />
            <RectangleButton
                title="Submit"
                backgroundColor="#007AFF"
                onPress={props.onSubmit}
            />
        </View>
    );
};
export default ForgotPasswordForm;

ForgotPasswordForm.propTypes = {
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