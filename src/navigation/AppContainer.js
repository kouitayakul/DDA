import React from "react";
import { Icon } from "react-native-elements";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";

//Auth Screens
import AdminLogin from "../screens/auth/AdminLogin";
import ChangePassword from "../screens/auth/ChangePassword";
import ForgotPassVerification from "../screens/auth/ForgotPassVerification";
import ForgotPassword from "../screens/auth/ForgotPassword";
import UserLogin from "../screens/auth/UserLogin";

//App Screens
import HomeScreen from "../screens/user/HomeScreen";
import JobScreen from "../screens/user/JobScreen";
import CarouselScreen from "../screens/user/CarouselScreen";
import JobComplete from "../screens/user/JobComplete";
import RewardsScreen from "../screens/user/RewardsScreen";
import ShiftSummaryScreen from "../screens/user/ShiftSummaryScreen";

//Employer Screens
import EmployerHome from "../screens/employer/EmployerHome";
import EmpJobScreen from "../screens/employer/EmpJobScreen";
import EmployeesScreen from "../screens/employer/EmployeesScreen";
import EmpUserScreen from "../screens/employer/EmpUserScreen";
import EmployerJobScreen from "../screens/employer/JobScreen";
import EmployerSubJobScreen from "../screens/employer/SubJobScreen";
import EmployerSubJobDetailScreen from "../screens/employer/SubJobDetailScreen";
//Admin Screens
import AdminHome from "../screens/admin/AdminHome";
import AllEmployers from "../screens/admin/AllEmployers";
import EmployerSignUp from "../screens/admin/EmployerSignUp";
import AllUsers from "../screens/admin/AllUsers";
import SingleUser from "../screens/admin/SingleUser";
import SingleUserEmployers from "../screens/admin/SingleUserEmployers";
import SingleUserSingleEmployerJobs from "../screens/admin/SingleUserSingleEmployerJobs";

const AuthNavigation = createSwitchNavigator(
  {
    AdminLogin: { screen: AdminLogin },
    ChangePassword: { screen: ChangePassword },
    ForgotPassVerification: { screen: ForgotPassVerification },
    ForgotPassword: { screen: ForgotPassword },
    UserLogin: { screen: UserLogin }
  },
  {
    headerMode: "none",
    initialRouteName: "UserLogin"
  }
);

const UserNavigation = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Employers`,
      headerLeft: <Icon name="menu" onPress={() => navigation.openDrawer()} />
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
  ShiftSummary: { screen: ShiftSummaryScreen },

  initialRouteName: "Home"
});

const UserRewards = createStackNavigator({
  RewardsScreen: {
    screen: RewardsScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Rewards`,
      headerLeft: <Icon name="menu" onPress={() => navigation.openDrawer()} />
    })
  }
});

const UserDrawerNavigation = createDrawerNavigator({
  Employers: {
    screen: UserNavigation,
    navigationOptions: () => ({
      drawerLabel: `Employers`
    })
  },
  Rewards: {
    screen: UserRewards,
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

const EmployersNavigation = createStackNavigator({
  EmployerHome: {
    screen: EmployerHome,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <Icon name="menu" onPress={() => navigation.openDrawer()} />,
      headerBackTitle: navigation.state.params.company.name,
      title: navigation.state.params.company.name
    })
  },
  Employees: {
    screen: EmployeesScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Employees`,
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
  EmployerJobs: {
    screen: EmployerJobScreen,
    navigationOptions: () => ({
      title: `Jobs`,
      headerBackTitle: `Jobs`
    })
  },
  EmployerSubJobs: {
    screen: EmployerSubJobScreen,
    navigationOptions: () => ({
      title: `SubJobs`,
      headerBackTitle: `SubJobs`
    })
  },
  EmployerSubJobsDetail: {
    screen: EmployerSubJobDetailScreen,
    navigationOptions: () => ({
      headerBackTitle: `SubJobs`
    })
  },

  initialRouteName: "EmployerHome"
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

const AdminNavigation = createStackNavigator({
  AdminHome: {
    screen: AdminHome,
    navigationOptions: ({ navigation }) => ({
      title: `Admin`,
      headerLeft: <Icon name="menu" onPress={() => navigation.openDrawer()} />
    })
  },
  AllEmployers: {
    screen: AllEmployers,
    navigationOptions: ({ navigation }) => ({
      title: `All Employers`,
      headerBackTitle: `All Employers`
    })
  },
  EmployerSignUp: { screen: EmployerSignUp },
  EmployerHome: {
    screen: EmployerHome,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.company.name,
      headerBackTitle: navigation.state.params.company.name
    })
  },
  Employees: {
    screen: EmployeesScreen,
    navigationOptions: ({ navigation }) => ({
      title: `Employees`,
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
  EmployerJobs: {
    screen: EmployerJobScreen,
    navigationOptions: () => ({
      title: `Jobs`,
      headerBackTitle: `Jobs`
    })
  },
  EmployerSubJobs: {
    screen: EmployerSubJobScreen,
    navigationOptions: () => ({
      title: `SubJobs`,
      headerBackTitle: `SubJobs`
    })
  },
  EmployerSubJobsDetail: {
    screen: EmployerSubJobDetailScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerBackTitle: `SubJobs`
    })
  },
  AllUsers: {
    screen: AllUsers,
    navigationOptions: ({ navigation }) => ({
      title: `All Users`,
      headerBackTitle: `All Users`
    })
  },
  SingleUser: {
    screen: SingleUser
  },
  SingleUserEmployers: {
    screen: SingleUserEmployers,
    navigationOptions: ({ navigation }) => ({
      title: `Employers`,
      headerBackTitle: `Employers`
    })
  },
  SingleUserSingleEmployerJobs: {
    screen: SingleUserSingleEmployerJobs,
    navigationOptions: ({ navigation }) => ({
      title: `Jobs`
    })
  }
});
const AdminDrawerNavigation = createDrawerNavigator({
  Admin: {
    screen: AdminNavigation,
    navigationOptions: () => ({
      drawerLabel: `Admin`
    })
  },
  Logout: {
    screen: AdminLogin,
    navigationOptions: () => ({
      drawerLabel: `Logout`
    })
  }
});

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    User: UserDrawerNavigation,
    Employer: EmployerDrawerNavigation,
    Admin: AdminDrawerNavigation
  },
  {
    initialRouteName: "Auth"
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
