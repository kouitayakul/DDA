import React from 'react';
import {
    Image,
    Text,
    StyleSheet,
    SafeAreaView,
    Alert,
    View,
    AsyncStorage
} from 'react-native';
import PinView from 'react-native-pin-view'
import RectangleButton from '../../components/RectangleButton'
import Layout from '../../constants/Layout'
import API from '../../constants/API'

const width = Layout.window.width;

export default class UserLogin extends React.Component {
    _storeData = async (code) => {
        try {
            await AsyncStorage.setItem('userCode', code);
        }
        catch (err) {
            console.log(err);
        }
    }
    onFulfill(code, clear) {
        try{
            fetch(API.endpoint + `users/${code}/login`, {
                method: 'POST'
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data[0].code == code) {
                    this._storeData(code);
                    this.props.navigation.navigate('User');
                } else {
                    Alert.alert(
                        'Invalid Code',
                        'Code does not match existing user',
                        [{text: 'OK'}],
                        {cancelable: false}
                    );
                    clear();
                     // If code does not match, clear input with: this.refs.codeInputRef1.clear()
                    // this.refs.codeInputRef1.clear();
                }
            })
            .catch((err) => {
                Alert.alert(
                    'Invalid Code',
                    'Code does not match existing user',
                    [{text: 'OK'}],
                    {cancelable: false}
                );
                clear();
                    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
                // this.refs.codeInputRef1.clear();
            });
        }catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={{width: 159, height: 128, marginTop: 10}}
                    source={require('../../assets/images/logo.png')}
                />
                <View style={styles.inputWrapper}>
                    <PinView
                        onComplete={(val, clear)=>{this.onFulfill(val, clear)}}
                        pinLength={4}
                        buttonTextColor='#000'
                        buttonBgColor='#EFEFF4'
                        buttonActiveOpacity={1}
                        inputBgColor='#FFF'
                        inputBgOpacity={1}
                        inputActiveBgColor='#8E8E93'
                        buttonDeletePosition='right'
                        keyboardViewStyle = {{marginVertical: 5, marginHorizontal: 15, height: 64, width: 64, borderRadius: 32}}
                        keyboardViewTextStyle={{fontWeight:'normal', fontSize:30}}
                        keyboardContainerStyle={{marginTop:10}}
                        inputViewStyle={{borderWidth:4, borderColor:'#8E8E93', marginHorizontal:13}}
                    />
                </View>
                <View style={[styles.smallText, {flexDirection: 'column', marginBottom: 10}]}>
                    <RectangleButton title='Admin and Employer Login' onPress={() => this.props.navigation.navigate('AdminLogin')} backgroundColor='#007AFF'/>
                    <Text style={{textAlign:'center', color:'#C7C7CC', paddingTop: 10}}>Jobs West is the supported employment division of the Developmental Disabilities Association.</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputWrapper: {
        width: '100%',
        marginTop: 36,
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
