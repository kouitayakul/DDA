import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import PropTypes from 'prop-types'
import RectangleButton from "../RectangleButton";

const SignUpForm = (props) => {
    return (
        <View>
            <View style={styles.container}>
            <View>
              <View>
                <TextInput
                  onChangeText={value => props.onFormChange('name', value)}
                  placeholder="First & Last Name"
                  style={styles.input}
                />
              </View>
              <View>
                <TextInput
                  onChangeText={value => props.onFormChange('company', value)}
                  placeholder="Company"
                  style={styles.input}
                />
              </View>
              <View>
                <TextInput
                  onChangeText={value => props.onFormChange('email', value)}
                  placeholder="Email"
                  style={styles.input}
                />
              </View>
              <View>
                <TextInput
                  onChangeText={value => props.onFormChange('password', value)}
                  placeholder="Password"
                  style={styles.input}
                  secureTextEntry
                />
              </View>
              <View>
                <TextInput
                  onChangeText={value => props.onFormChange('confirmPassword', value)}
                  placeholder="Confirm password"
                  style={styles.input}
                  secureTextEntry
                />
              </View>
              <View>
                <TextInput
                  onChangeText={value => props.onFormChange('phone', value)}
                  placeholder="Phone Number"
                  style={styles.input}
                  secureTextEntry
                />
              </View>
              <View>
                <TextInput
                  onChangeText={value => props.onFormChange('address', value)}
                  placeholder="Address"
                  style={styles.input}
                  secureTextEntry
                />
              </View>
              </View>
              <View style={styles.submit}>
                <RectangleButton
                  title="Submit"
                  onPress={props.onSubmit}
                  style={styles.submit}
                  backgroundColor= '#F7971D'
                />
              </View>
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
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    input: {
        width: 300,
        height: 50,
        fontSize: 18,
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 18
    },
    submit: {
        alignItems: 'center',
        marginBottom: 50
    }
});