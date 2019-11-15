import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const AppHeader = (props) => {
    return (
        <Header
            leftComponent={{ 
                icon: props.iconStyle ? (props.leftArrow ? 'chevron-left' : 'menu') : null, 
                text: props.leftText ? props.leftText : null, 
                onPress: props.onPressLeft, 
                color: 'dodgerblue',
                size: 30,
                style: { color: 'dodgerblue', fontSize: 18 } 
            }}
            centerComponent={{ 
                text: props.title ? props.title : null, 
                style: props.largeTitle ? { color: '#000', fontSize: 30, fontWeight: '500' } : { color: '#000', fontSize: 25, fontWeight: '400' },
            }}
            rightComponent={{
                text: props.rightText ? props.rightText : null,
                onPress: props.onPressRight,
                style: { color: 'dodgerblue', fontSize: 18 }
            }}
            containerStyle={{ 
                backgroundColor: props.backgroundColor ? props.backgroundColor : '#FFF' 
            }}
        />
    );
};

AppHeader.propTypes = {
    title: PropTypes.string,
    largeTitle: PropTypes.bool,
    backgroundColor: PropTypes.string,
    onPressLeft: PropTypes.func,
    onPressRight: PropTypes.func,
    leftText: PropTypes.string,
    rightText: PropTypes.string,
    leftArrow: PropTypes.bool,
    iconStyle: PropTypes.bool,
};

AppHeader.defaultProps = {
    leftArrow: false,
    iconStyle: false,
}

export default AppHeader;
