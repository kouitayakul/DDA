import React from 'react';
import {
    Text,
    Button,
    StyleSheet,
    View,
} from 'react-native';
import { Auth } from 'aws-amplify';
import Header from "../components/Header";


export default class StartScreen extends React.Component {


  renderAuthLink() {
    return <Text style={styles.link} onPress={() => this.props.navigation.navigate('Auth')}> here.</Text>;
}

    render() {
        return (
          <Header title="Title"/>
            <View style={styles.container}>
              <Text style={styles.text}>Sign in to DDA.</Text>
              <Text style={styles.text}>____ _____ _____ ____</Text>
              <Text style={styles.smallText}>If you are DDA staff or an Employer, please login </Text>{this.renderAuthLink()
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginBottom: 20,
        color: 'black',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
    },
    smallText: {
        marginBottom: 20,
        color: 'black',
        fontStyle: 'italic',
        fontSize: 12,
        lineHeight: 19,
        textAlign: 'center',
    },
    link: {
        marginBottom: 20,
        color: 'purple',
        textDecorationLine: 'underline',
        fontSize: 12,
        lineHeight: 19,
        textAlign: 'center',
    },
});
