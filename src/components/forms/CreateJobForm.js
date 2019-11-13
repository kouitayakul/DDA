import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';

const CreateJobForm = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(value) => props.onFormChange("title", value)}
                placeholder="Title"
                underlineColorAndroid="transparent"
            />
            <TextInput
                style={styles.input}
                onChangeText={(value) => props.onFormChange("description", value)}
                placeholder="Description"
                underlineColorAndroid="transparent"
            />
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
        height: 150,
    },
    input: {
        width: 300,
        height: 40,
        fontSize: 18,
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingLeft: 5,
    }
});
