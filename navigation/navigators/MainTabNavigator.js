import { createTabNavigator } from 'react-navigation';

import HomeTab from '../../screens/tabs/HomeTab';
import HistoryTab from '../../screens/tabs/HistoryTab';

const MainTabNavigator = createTabNavigator(
  {
    Home: {
      screen: HomeTab
    },
    History: {
      screen: HistoryTab
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      allowFontScaling: true,
      indicatorStyle: {
        opacity: 0
      },
      style: {
        backgroundColor: '#C62828'
      },
      activeTintColor: '#ffffff',
      inactiveTintColor: '#e0e0e0'
    }
  }
);

export default MainTabNavigator;
