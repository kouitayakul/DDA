import React from 'react';
import {Button} from 'react-native-elements';
import PropTypes from 'prop-types';

const RectangleButton = (props) => {
    return (
        <Button
            title={props.title}
            onPress={props.onPress}
            titleStyle={{
                color: props.color ? props.color : '#FFF',
                textAlign: 'center',
                fontSize: 17,
                fontWeight: '600'
            }}
            buttonStyle={{
                backgroundColor: props.backgroundColor ? props.backgroundColor : '#9ACD32',
                height: 48,
                width: '100%',
                paddingHorizontal: 30,
                borderRadius: 10
            }}
        />
    )
};

RectangleButton.propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired
};

export default RectangleButton;

