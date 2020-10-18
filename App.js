import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import RootStackNavigator from './src/navigation/navigators/RootStackNavigator';

const ApplicationContainer = createAppContainer(RootStackNavigator);

export default class App extends Component {
  render() {
    return <ApplicationContainer />;
  }
}
