import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/AuthScreen';

export default createAppContainer(createSwitchNavigator({
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Authentication: AuthScreen,
    Main: MainTabNavigator,
}));