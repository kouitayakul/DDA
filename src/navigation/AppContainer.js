import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

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
    headerMode: 'none',
    initialRouteName: 'UserLogin'
  }
);

const EmployerNavigation = createDrawerNavigator({
  Company: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Company Name`,
      headerLeft: 'menu',
    }),
  },
  Logout: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Logout`,
      headerLeft: 'menu',
    }),
  },
    initialRouteName: 'Company'
  });

const UserNavigation = createDrawerNavigator(
  { 
    Employers: { 
      screen: createStackNavigator({
        Home: {
        screen: HomeScreen,
        navigationOptions: () => ({
          title: `Employers`,
          headerLeft: 'menu',
        }),
      },
        Jobs: {
        screen: JobScreen,
        navigationOptions: () => ({
          title: `Jobs`,
          headerBackTitle: `Cancel`
        }),
      },
        Carousel: {screen: CarouselScreen},
        JobComplete: {screen: JobComplete}
    }),
    },
    Rewards: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: `Rewards`,
        headerLeft: 'menu',
      }),
    },
    Logout: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: `Logout`,
        headerLeft: 'menu',
      }),
    }
  },
  {
    initialRouteName: 'Employers'
  }
);

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthNavigation,
  User: UserNavigation,
  Employer: EmployerNavigation,
}, {
  initialRouteName: 'Auth'
})

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer