import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/AuthScreen';

export default createAppContainer(createSwitchNavigator({
    // goto AuthScreen page by default,
    // left MainTabNavigator alone since there are some good examples in it
    Authentication: AuthScreen,

    // TODO: update auth flow to something more like below
    // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html


  Main: MainTabNavigator,
}));