import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import StartScreen from "../screens/StartScreen";
import AuthScreen from "../screens/auth/AuthScreen";
import EmployerSignUpScreen from "../screens/auth/EmployerSignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ChangePasswordScreen from "../screens/auth/ChangePasswordScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import ForgotPassVerificationScreen from "../screens/auth/ForgotPassVerificationScreen";

export default createAppContainer(createSwitchNavigator({
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Start: StartScreen,
    Auth: AuthScreen,
    ChangePassword: ChangePasswordScreen,
    ForgotPassword: ForgotPasswordScreen,
    ForgotPassVerification: ForgotPassVerificationScreen,
    EmployerSignUp: EmployerSignUpScreen,
    Home: HomeScreen,
    Main: MainTabNavigator,
}));