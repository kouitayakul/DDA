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

const AppNavigation = createStackNavigator(
  { 
    Home: { screen: HomeScreen }
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