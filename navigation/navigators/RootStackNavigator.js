import { createStackNavigator } from 'react-navigation';

import AboutScreen from '../../screens/AboutScreen';
import MainTabNavigator from './MainTabNavigator';
import navOptions from '../navigationOptions/CommonNavigationOptions';

const RootStackNavigator = createStackNavigator({
  Main: {
    screen: MainTabNavigator,
    navigationOptions: navOptions
  },
  About: {
    screen: AboutScreen,
    navigationOptions: navOptions
  }
});

export default RootStackNavigator;
