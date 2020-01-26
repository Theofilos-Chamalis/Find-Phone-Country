import React, { Component } from 'react';
import RootStackNavigator from '../navigation/navigators/RootStackNavigator';
import { createAppContainer } from 'react-navigation';

const ApplicationContainer = createAppContainer(RootStackNavigator);

export default class Main extends Component {
  static defaultNavigationOptions = {
    header: null
  };

  render() {
    // return <RootStackNavigator />;
    return <ApplicationContainer />;
  }
}
