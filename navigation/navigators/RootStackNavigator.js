import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';

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
    },
    {
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS
        }
    });

export default RootStackNavigator;
