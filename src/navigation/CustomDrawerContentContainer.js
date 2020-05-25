import React from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, Text, ScrollView} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer';
import {Auth} from 'aws-amplify';

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
    <SafeAreaView>
      <ScrollView>
        <DrawerItems
          {...props}
          onItemPress = {( route ) => {
            if (route.route.routeName === 'Logout') {
              signOut();
            }
            props.onItemPress(route)
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
};