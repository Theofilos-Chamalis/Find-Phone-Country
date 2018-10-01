import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class AboutScreen extends Component {
  state = {
    salala: 0
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}
