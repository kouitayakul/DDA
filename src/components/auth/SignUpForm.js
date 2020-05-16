import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import PropTypes from 'prop-types'
import RectangleButton from "../RectangleButton";

const SignUpForm = (props) => {
  inputs = {};

  function focusNextField(id) {
    this.inputs[id].focus();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        blurOnSubmit={false}
        returnKeyType={"next"}
        ref={ input => { this.inputs['name'] = input; }}
        onSubmitEditing={() => { focusNextField('company'); }}
        onChangeText={value => props.onFormChange('name', value)}
        placeholder="First & Last Name"
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        blurOnSubmit={false}
        returnKeyType={"next"}
        ref={ input => { this.inputs['company'] = input; }}
        onSubmitEditing={() => { focusNextField('email'); }}
        onChangeText={value => props.onFormChange('company', value)}
        placeholder="Company"
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        blurOnSubmit={false}
        returnKeyType={"next"}
        ref={ input => { this.inputs['email'] = input; }}
        onSubmitEditing={() => { focusNextField('password'); }}
        onChangeText={value => props.onFormChange('email', value)}
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        blurOnSubmit={false}
        returnKeyType={"next"}
        ref={ input => { this.inputs['password'] = input; }}
        onSubmitEditing={() => { focusNextField('confirmPassword'); }}
        onChangeText={value => props.onFormChange('password', value)}
        autoCapitalize="none"
        placeholder="Password"
        placeholderTextColor="#CCC"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        blurOnSubmit={false}
        returnKeyType={"next"}
        ref={ input => { this.inputs['confirmPassword'] = input; }}
        onSubmitEditing={() => { focusNextField('phone'); }}
        onChangeText={value => props.onFormChange('confirmPassword', value)}
        autoCapitalize="none"
        placeholder="Confirm password"
        placeholderTextColor="#CCC"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        blurOnSubmit={false}
        returnKeyType={"next"}
        ref={ input => { this.inputs['phone'] = input; }}
        onSubmitEditing={() => { focusNextField('address'); }}
        onChangeText={value => props.onFormChange('phone', value)}
        autoCapitalize="none"
        placeholder="Phone Number"
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        blurOnSubmit={true}
        returnKeyType={"done"}
        ref={ input => { this.inputs['address'] = input; }}
        onChangeText={value => props.onFormChange('address', value)}
        autoCapitalize="none"
        placeholder="Address"
        placeholderTextColor="#CCC"
      />
    </View>
  );
};

export default SignUpForm;

SignUpForm.propTypes = {
    onFormChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingHorizontal: 16,
    alignSelf: 'stretch',
    paddingTop: 20
  },
  input: {
    fontSize: 18,
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 30
  },
});