import { Icon } from 'native-base';
import React, { Component } from 'react';
import { createTabNavigator, createStackNavigator } from 'react-navigation';
import { View, TouchableWithoutFeedback } from 'react-native';

import HomeTab from './tabs/HomeTab';
import HistoryTab from './tabs/HistoryTab';
import AboutScreen from './AboutScreen';

export default class Main extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     headerTitle: 'Find Phone Country',
  //     headerStyle: {
  //       backgroundColor: '#C62828'
  //     },
  //     headerTintColor: '#FFFFFF',
  //     headerTitleStyle: {
  //       fontWeight: 'bold',
  //       justifyContent: 'space-between',
  //       alignSelf: 'center',
  //       textAlign: 'center',
  //       flex: 1,
  //       flexGrow: 1
  //     },
  //     headerRight: (
  //       <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
  //         <Icon
  //           name="ios-help-circle-outline"
  //           style={{ paddingRight: 16, color: 'white' }}
  //         />
  //       </TouchableWithoutFeedback>
  //     ),
  //     headerLeft: <View />
  //   };
  // };

  render() {
    return <RootStack />;
  }
}

const navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Find Phone Country',
    headerStyle: {
      backgroundColor: '#C62828'
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent: 'space-between',
      alignSelf: 'center',
      textAlign: 'center',
      flex: 1,
      flexGrow: 1
    },
    headerRight: (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('About')}>
        <Icon
          name="ios-help-circle-outline"
          style={{ paddingRight: 16, color: 'white' }}
        />
      </TouchableWithoutFeedback>
    ),
    headerLeft: <View />
  };
};

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

const RootStack = createStackNavigator({
  Main: {
    screen: MainTabNavigator
  },
  About: {
    screen: AboutScreen
  }
});

MainTabNavigator.navigationOptions = navigationOptions;
AboutScreen.navigationOptions = navigationOptions;
