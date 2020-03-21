import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import PropTypes from 'prop-types'
import RectangleButton from "../RectangleButton";

const SignUpForm = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={value => props.onFormChange('name', value)}
        placeholder="First & Last Name"
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => props.onFormChange('company', value)}
        placeholder="Company"
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => props.onFormChange('email', value)}
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => props.onFormChange('password', value)}
        autoCapitalize="none"
        placeholder="Password"
        placeholderTextColor="#CCC"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={value => props.onFormChange('confirmPassword', value)}
        autoCapitalize="none"
        placeholder="Confirm password"
        placeholderTextColor="#CCC"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={value => props.onFormChange('phone', value)}
        autoCapitalize="none"
        placeholder="Phone Number"
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        onChangeText={value => props.onFormChange('address', value)}
        autoCapitalize="none"
        placeholder="Address"
        placeholderTextColor="#CCC"
      />
      <RectangleButton
        title="Submit"
        onPress={props.onSubmit}
        style={styles.submit}
        backgroundColor= '#007AFF'
      />
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
    paddingHorizontal: 16,
    alignSelf: 'stretch'
  },
  input: {
    fontSize: 18,
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 30
  },
});