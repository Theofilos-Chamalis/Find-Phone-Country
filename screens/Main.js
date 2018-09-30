import { Container, Text, Content, Icon } from 'native-base';
import React, { Component } from 'react';
import { createTabNavigator } from 'react-navigation';
import { View } from 'react-native';

import HomeTab from './tabs/HomeTab';
import HistoryTab from './tabs/HistoryTab';

export default class Main extends Component {
  static navigationOptions = {
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
      <Icon
        name="ios-help-circle-outline"
        style={{ paddingRight: 16, color: 'white' }}
      />
    ),
    headerLeft: <View />
  };

  render() {
    return (
      <MainNavigator>
        <Text> Welcome to the Find Phone Country App! </Text>
      </MainNavigator>
    );
  }
}

const MainNavigator = createTabNavigator(
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
