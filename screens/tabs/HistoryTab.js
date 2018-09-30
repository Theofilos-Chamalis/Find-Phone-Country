import { Container, Text, Content, Icon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

export default class PlanetTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="ios-time-outline" style={{ color: tintColor }} />;
    }
  };

  render() {
    return (
      <Container style={styles.containerStyle}>
        <StatusBar backgroundColor="#B71C1C" />
        <Content>
          <View style={styles.noUsersView}>
            <Text style={styles.noUsersText}> This is the history tab</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#212121'
  },
  noUsersText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white'
  },
  noUsersView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
