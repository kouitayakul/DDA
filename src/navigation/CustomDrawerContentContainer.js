import React from 'react';
import {TouchableOpacity, SafeAreaView, StyleSheet, Text, ScrollView, View} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerItems } from 'react-navigation-drawer';
import { Auth } from 'aws-amplify';

export const CustomDrawerContentComponent = (props) => {
  const nav = props.nav;

  async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'space-between', flexDirection: 'column'}}>
      <ScrollView style={{paddingTop: 20}}>
        <DrawerItems {...props} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          signOut();
          props.navigation.navigate('Auth');
        }}
      >
        <View style={styles.button}>
          <Icon
            name="sign-out"
            style={{ color: "#007AFF" }}
            size={25}
          />
          <Text style={styles.logout}>Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  button: {
    margin: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  logout: {
    fontFamily: "System",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    fontWeight: "500",
    color: "#007AFF",
    marginLeft: 10
  },
})