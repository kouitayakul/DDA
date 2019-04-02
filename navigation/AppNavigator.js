import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import StartScreen from "../screens/StartScreen";
import AuthScreen from "../screens/AuthScreen";
import EmployerSignUpScreen from "../screens/EmployerSignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

export default createAppContainer(createSwitchNavigator({
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Start: StartScreen,
    Auth: AuthScreen,
    EmployerSignUp: EmployerSignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
    Home: HomeScreen,
    Main: MainTabNavigator,

}));