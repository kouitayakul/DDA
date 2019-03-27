import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View } from 'react-native';

export default class RectangularButton extends Component {
    render() {
        return (
                <Button
                    title={this.props.title}
                    raised
                    onPress={this.props.onPress}
                    titleStyle={{
                        textAlign: 'center',
                        fontSize: 24,
                        fontWeight: '700',
                        letterSpacing: 1.5,
                        textTransform: 'uppercase'
                    }}
                    buttonStyle={{
                        backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#9ACD32',
                        width: 300,
                        height: 50,
                        borderRadius: 30
                    }}
                />
        );
    }
}