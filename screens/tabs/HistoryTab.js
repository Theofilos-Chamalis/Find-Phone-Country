import { Container, Text, Content, Icon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Timeline from 'react-native-timeline-listview';

import { getAllRecords } from '../../db/asyncStorageProvider';

export default class HistoryTab extends Component {
  constructor(props) {
    super(props);
    this.data = [
      {
        time: '04/06\n09:00',
        title: 'Archery Training',
        description:
          'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        icon: require('../../assets/globenphone.png')
      },
      {
        time: '29/05\n10:45',
        title: 'Play Badminton',
        description:
          'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        icon: require('../../assets/globenphone.png')
      },
      {
        time: '28/05\n14:00',
        title: 'Watch Soccer',
        description:
          'Team sport played between two teams of eleven players with a spherical ball. ',
        icon: require('../../assets/globenphone.png')
      },
      {
        time: '27/05\n16:30',
        title: 'Go to Fitness center',
        description: 'Look out for the Best Gym & Fitness Centers around me :)',
        icon: require('../../assets/globenphone.png')
      }
    ];
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="ios-time-outline" style={{ color: tintColor }} />;
    }
  };

  didFocusSubscription = this.props.navigation.addListener('didFocus', () => {
    getAllRecords()
      .then((results) => {
        console.log('Retrieving all records:');
        console.log(results);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  render() {
    return (
      <View style={styles.container}>
        <Timeline
          data={this.data}
          circleSize={20}
          iconStyle={{ marginTop: 25 }}
          circleColor="#212121"
          lineColor="#C62828"
          timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
          timeStyle={{
            textAlign: 'center',
            backgroundColor: '#306BAC',
            color: 'white',
            padding: 5,
            borderRadius: 13
          }}
          titleStyle={{ color: '#ffffff' }}
          descriptionStyle={{ color: '#EAE6E5' }}
          options={{
            style: { paddingTop: 5 }
          }}
          innerCircle={'icon'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    backgroundColor: '#212121'
  }
});
