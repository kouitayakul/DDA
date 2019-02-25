import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types'

const SignIn = (props) => {
    return (
        <View style={styles.form}>
            <Input
                label="Email"
                leftIcon={{type: 'font-awesome', name: 'envelope'}}
                onChangeText={(value) => props.onFormChange("email", value)}
                placeholder="my@email.com"
            />
            <Input
                label="Password"
                leftIcon={{type: 'font-awesome', name: 'lock'}}
                onChangeText={(value) => props.onFormChange("password", value)}
                placeholder="p@ssw0rd123"
                secureTextEntry
            />
            <Button
                title='Submit'
                onPress={props.onSubmit}
            />
        </View>
    );
};
export default SignIn;

SignIn.propTypes = {
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    form: {width: '90%'},
});