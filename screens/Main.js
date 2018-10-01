import React, { Component } from 'react';
import RootStackNavigator from '../navigation/navigators/RootStackNavigator';

export default class Main extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return <RootStackNavigator />;
  }
}
