import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Authentication from '../components/Authentication';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
    Authentication: Authentication,

    // TODO: update auth flow to something more like below
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html

  // goto Authentication page by default,
  // left MainTabNavigator alone since there are some good examples in it

  Main: MainTabNavigator,
}));