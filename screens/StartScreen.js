import React from 'react';
import {
    Text,
    StyleSheet,
    View,
} from 'react-native';
import RectangularButton from "../components/RectangularButton";

export default class StartScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>(logo goes here)</Text>
                <Text style={styles.text}>____ _____ _____ ____</Text>
                <View style={[styles.smallText, {flexDirection: 'row', paddingTop: 20}]}>
                    <Text>If you are DDA staff or an Employer, please login </Text>
                    <Text style={styles.link} onPress={() => this.props.navigation.navigate('Auth')}>here.</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
        lineHeight: 19,
    },
    smallText: {
        fontSize: 14,
    },
    link: {
        color: '#F98C04',
        fontWeight: 'bold',
    },
});
