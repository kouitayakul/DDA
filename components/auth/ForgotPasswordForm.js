import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import RectangleButton from "../RectangleButton";

const ForgotPasswordForm = (props) => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={{paddingBottom: 5}}> Enter the email address used for the account.</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(value) => props.onFormChange("email", value)}
                    placeholder="Email"
                    placeholderTextColor="black"
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
export default ForgotPasswordForm;

ForgotPasswordForm.propTypes = {
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
        height: 150
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