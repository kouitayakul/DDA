import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import RectangleButton from "../RectangleButton";

const CreateJobForm = (props) => {
    return (
      <View style={styles.centre}>
        <View style={styles.container}>
          <TextInput
              style={styles.input}
              onChangeText={(value) => props.onFormChange("jobid", value)}
              placeholder="Job ID"
              placeholderTextColor="grey"
          />
          <TextInput
              style={styles.input}
              onChangeText={(value) => props.onFormChange("title", value)}
              placeholder="Title"
              placeholderTextColor="grey"
          />
          <TextInput
              style={styles.description}
              onChangeText={(value) => props.onFormChange("description", value)}
              placeholder="Description"
              placeholderTextColor="grey"
              multiline={true}
          />
           <View style={styles.container}>
                <RectangleButton
                    title="Back"
                    backgroundColor="#F7971D"
                    onPress={props.onSubmit}
                />
                <RectangleButton
                    title="Create"
                    backgroundColor="#F7971D"
                    onPress={props.onSubmit}
                />
            </View>
        </View>
      </View>
  );
}

export default CreateJobForm;

CreateJobForm.propTypes = {
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        height: 500,
    },
    input: {
        backgroundColor: '#FACA8E',
        width: 300,
        height: 50,
        fontSize: 18,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#F7971D',
        textAlign: 'left',
        paddingLeft: 15
    },
    description: {
        backgroundColor: '#FACA8E',
        width: 300,
        height: 150,
        fontSize: 18,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#F7971D',
        textAlign: 'left',
        paddingLeft: 15
    },
    button: {
        justifyContent: 'space-around',
        flexDirection: 'column',
    }
});