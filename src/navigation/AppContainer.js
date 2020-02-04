import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

//Auth Screens
import AdminLogin from "../screens/auth/AdminLogin";
import ChangePassword from "../screens/auth/ChangePassword";
import EmployerSignUp from "../screens/auth/EmployerSignUp";
import ForgotPassVerification from "../screens/auth/ForgotPassVerification";
import ForgotPassword from "../screens/auth/ForgotPassword";
import UserLogin from "../screens/auth/UserLogin";

//App Screens
import HomeScreen from "../screens/user/HomeScreen";
import JobScreen from "../screens/user/JobScreen";
import CarouselScreen from "../screens/user/CarouselScreen";
import JobComplete from "../screens/user/JobComplete";

//Employer Screens
import EmpJobScreen from "../screens/employer/EmpJobScreen";
import EmployeesScreen from "../screens/employer/EmployeesScreen";
import EmpUserScreen from "../screens/employer/EmpUserScreen";

import React, { Component } from "react";
import { Icon } from "react-native-elements";
import DrawerActions from "react-navigation-drawer";

const AuthNavigation = createSwitchNavigator(
  {
    AdminLogin: { screen: AdminLogin },
    ChangePassword: { screen: ChangePassword },
    EmployerSignUp: { screen: EmployerSignUp },
    ForgotPassVerification: { screen: ForgotPassVerification },
    ForgotPassword: { screen: ForgotPassword },
    UserLogin: { screen: UserLogin }
  },
  {
    headerMode: "none",
    initialRouteName: "UserLogin"
  }
);

const EmployersNavigation = createStackNavigator({
  Employees: {
    screen: EmployeesScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Employees`,
      headerLeft: (
        <Icon name="menu" onPress={() => navigation.openDrawer()}>
          {" "}
        </Icon>
      ),
      headerBackTitle: `Employees`
    })
  },
  Employee: {
    screen: EmpUserScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.name,
      headerBackTitle: navigation.state.params.name
    })
  },
  Jobs: {
    screen: EmpJobScreen,
    navigationOptions: () => ({
      title: `Jobs`,
      headerBackTitle: `Cancel`
    })
  },

  initialRouteName: "Employees"
});

const EmployerDrawerNavigation = createDrawerNavigator({
  Company: {
    screen: EmployersNavigation,
    navigationOptions: () => ({
      drawerLabel: `Company Name`
    })
  },
  Logout: {
    screen: AuthNavigation,
    navigationOptions: () => ({
      drawerLabel: `Logout`
    })
  }
});

const UserNavigation = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Employers`,
      headerLeft: (
        <Icon name="menu" onPress={() => navigation.openDrawer()}>
          {" "}
        </Icon>
      )
    })
  },
  AssignedJobs: {
    screen: JobScreen,
    navigationOptions: () => ({
      title: `Jobs`,
      headerBackTitle: `Cancel`
    })
  },
  Carousel: { screen: CarouselScreen },
  JobComplete: { screen: JobComplete },

  initialRouteName: "Home"
});

const UserDrawerNavigation = createDrawerNavigator({
  Employers: {
    screen: UserNavigation,
    navigationOptions: () => ({
      drawerLabel: `Employers`
    })
  },
  Rewards: {
    screen: HomeScreen,
    navigationOptions: () => ({
      drawerLabel: `Rewards`
    })
  },
  Logout: {
    screen: UserLogin,
    navigationOptions: () => ({
      drawerLabel: `Logout`
    })
  }
});

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    User: UserDrawerNavigation,
    Employer: EmployerDrawerNavigation
  },
  {
    initialRouteName: "Auth"
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
