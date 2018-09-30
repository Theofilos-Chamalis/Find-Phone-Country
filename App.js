import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Main from './screens/Main';

const Navigator = createStackNavigator({
  Main: {
    screen: Main
  }
});

export default class App extends Component {
  render() {
    return <Navigator />;
  }
}
