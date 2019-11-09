import React from 'react';
import {
    Text,
    StyleSheet,
    Alert,
    View,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';

export default class UserLogin extends React.Component {
    onFulfill(code) {
        const testCodes = ["1234", "5678"];
        // TODO: check database for a matching user code, navigate to User menu on success
        if (testCodes.includes(code)) {
            Alert.alert(
                'Confirmation Code',
                'Successful!',
                [{text: 'OK'}],
                {cancelable: false}
            );
            this.props.navigation.navigate('App');
        } else {
            Alert.alert(
                'Confirmation Code',
                'Code does not match!',
                [{text: 'OK'}],
                {cancelable: false}
            );
            // If code does not match, clear input with: this.refs.codeInputRef1.clear()
            this.refs.codeInputRef1.clear();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>(logo goes here)</Text>
                <View style={styles.inputWrapper}>
                    <CodeInput
                        ref="codeInputRef1"
                        keyboardType="numeric"
                        codeLength={4}
                        size={65}
                        inputPosition='center'
                        activeColor="black"
                        inactiveColor="black"
                        codeInputStyle={styles.codeInput}
                        onFulfill={(code) => this.onFulfill(code)}
                    />
                </View>
                <View style={[styles.smallText, {flexDirection: 'row', paddingTop: 30}]}>
                    <Text>If you are DDA staff or an Employer, please login </Text>
                    <Text style={styles.link} onPress={() => this.props.navigation.navigate('AdminLogin')}>here.</Text>
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
    codeInput: {
        backgroundColor: "#FACA8E",
        borderRadius: 5,
        borderWidth: 2.5,
        borderColor: "#F7971D",
        fontSize: 32,
        fontWeight: 'bold'
    },
    inputWrapper: {
        height: 70,
        width: '100%',
    },
    text: {
        fontSize: 16,
        color: 'black',
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
