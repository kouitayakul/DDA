import React from 'react';
import {
    Text,
    Button,
    StyleSheet,
    View,
} from 'react-native';
import { Auth } from 'aws-amplify';
import Carousel from '../components/Carousel';

const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]

export default class StartScreen extends React.Component {


  renderAuthLink() {
    return <Text style={styles.link} onPress={() => this.props.navigation.navigate('Auth')}> here.</Text>;
}

    render() {
        return (
            <View style={styles.container}>
              <Text style={styles.text}>Sign in to DDA.</Text>
              <Text style={styles.text}>____ _____ _____ ____</Text>
              <Text style={styles.smallText}>If you are DDA staff or an Employer, please login </Text>{this.renderAuthLink()}
              <Carousel images={images}/>
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
