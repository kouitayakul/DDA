import React from 'react';
import {
    Text,
    Button,
    StyleSheet,
    View,
} from 'react-native';
import { Auth } from 'aws-amplify';

export default class StartScreen extends React.Component {

    renderAuthLink() {
        return <Text style={[styles.text, styles.smallText, styles.link]} onPress={() => this.props.navigation.navigate('Auth')}>here.</Text>;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>(logo goes here)</Text>
                <Text style={styles.text}>____ _____ _____ ____</Text>
                <Text style={[styles.text, styles.smallText]}>If you are DDA staff or an Employer, please login {this.renderAuthLink()}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    text: {
        fontSize: 16,
        // fontFamily: 'Arial',
        textAlign: 'center',
        color: 'black',
    },
    smallText: {
        fontSize: 14,
    },
    link: {
        color: '#F98C04',
        fontWeight: 'bold',
    },
});
