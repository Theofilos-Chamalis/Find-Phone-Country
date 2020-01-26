import { createStackNavigator } from 'react-navigation-stack';

import AboutScreen from '../../screens/AboutScreen';
import MainTabNavigator from './MainTabNavigator';
import navOptions from '../navigationOptions/CommonNavigationOptions';

const RootStackNavigator = createStackNavigator({
  Main: {
    screen: MainTabNavigator,
    defaultNavigationOptions: navOptions
  },
  About: {
    screen: AboutScreen,
    defaultNavigationOptions: navOptions
  }
});

export default RootStackNavigator;
