import {Button} from 'react-native-elements';
import React from "react";
import PropTypes from 'prop-types';

const CircleButton = (props) => {
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
                width: 200,
                height: 200,
                borderRadius: 100
            }}
        />
    )
};

CircleButton.propTypes = {
    backgroundColor: PropTypes.string,
    onPress: PropTypes.func,
    title: PropTypes.string.isRequired
};

export default CircleButton;
