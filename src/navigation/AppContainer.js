import { createSwitchNavigator, createAppContainer } from 'react-navigation'
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

const AuthNavigation = createStackNavigator(
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

const AppNavigation = createStackNavigator(
  { 
    Home: { 
      screen: HomeScreen,
      navigationOptions: () => ({
        title: `Employers`
      }),
    },
    Job: { 
      screen: JobScreen,
      navigationOptions: () => ({
        title: `Jobs`,
        headerBackTitle: `Cancel`
      }),
    },
    Carousel: {screen: CarouselScreen},
    JobComplete: {screen: JobComplete}
  },
  {
    initialRouteName: 'Home'
  }
);

const SwitchNavigator = createSwitchNavigator({
  Auth: AuthNavigation,
  App: AppNavigation
}, {
  initialRouteName: 'Auth'
})

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer