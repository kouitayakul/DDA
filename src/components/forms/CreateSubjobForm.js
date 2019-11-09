import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';

const CreateSubjobForm = (props) => {
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
            <TextInput
                style={styles.input}
                onChangeText={(value) => props.onFormChange("imglink", value)}
                placeholder="Image Link"
                underlineColorAndroid="transparent"
            />
            <TextInput
                style={styles.input}
                onChangeText={(value) => props.onFormChange("ordernum", value)}
                placeholder="Order Number"
                underlineColorAndroid="transparent"
            />
        </View>
    );
}

export default CreateSubjobForm;

CreateSubjobForm.propTypes = {
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        height: 300,
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