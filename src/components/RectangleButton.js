import React from 'react';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';

const RectangleButton = (props) => {
    return (
        <Button
            title={props.title}
            raised
            onPress={props.onPress}
            titleStyle={{
                textAlign: 'center',
                fontSize: 24,
                fontWeight: '700',
                letterSpacing: 1.5,
                textTransform: 'uppercase'
            }}
            buttonStyle={{
                backgroundColor: props.backgroundColor ? props.backgroundColor : '#9ACD32',
                width: 300,
                height: 50,
                borderRadius: 30
            }}
        />
    )
};

RectangleButton.propTypes = {
    backgroundColor: PropTypes.string,
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired
};

export default RectangleButton;

