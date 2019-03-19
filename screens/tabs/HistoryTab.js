import { Icon } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import moment from 'moment';

import { getAllRecords } from '../../db/asyncStorageProvider';
import addPrecedingZero from '../../utils/precedingZero';

export default class HistoryTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timelineData: [],
      history: false
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="ios-time" style={{ color: tintColor }} />;
    }
  };

  didFocusSubscription = this.props.navigation.addListener('didFocus', () => {
    getAllRecords()
      .then(async (results) => {
        if (results.length > 0) {
          await this.setState({ history: true });
          this.fillTimeline(results);
        } else {
          await this.setState({ history: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  fillTimeline = (data) => {
    const timelineArray = data.map((call, index) => {
      const timestamp = Number(call[0]);
      const month = addPrecedingZero(
        (
          moment
            .utc(timestamp)
            .local()
            .month() + 1
        ).toString()
      );
      const day = addPrecedingZero(
        moment
          .utc(timestamp)
          .local()
          .date()
          .toString()
      );
      const hour = addPrecedingZero(
        moment
          .utc(timestamp)
          .local()
          .hour()
          .toString()
      );
      const minute = addPrecedingZero(
        moment
          .utc(timestamp)
          .local()
          .minute()
          .toString()
      );
      const phone = JSON.parse(call[1]).phone;
      const carrier = JSON.parse(call[1]).carrier;
      const country = JSON.parse(call[1]).countryOfOrigin;
      const phoneType = JSON.parse(call[1]).phoneType;
      return {
        time: `${day}/${month}\n${hour}:${minute}`,
        title: `Phone #${index + 1}`,
        description: `Phone:  ${phone}\nCarrier:  ${carrier}\nCountry:  ${country}\nPhone Type:  ${phoneType}`,
        icon:
          phoneType === 'Mobile'
            ? require('../../assets/smartphone.png')
            : require('../../assets/telephone.png')
      };
    });

    this.setState({
      timelineData: timelineArray
    });
  };

  render() {
    const timeline = this.state.history ? (
      <Timeline
        data={this.state.timelineData}
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
          style: { paddingTop: 5 },
          enableEmptySections: true
        }}
        innerCircle={'icon'}
      />
    ) : (
      <View style={styles.textContainer}>
        <Text style={styles.noHistoryText}>No history available</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#B71C1C" />
        {timeline}
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
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noHistoryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
    alignSelf: 'center',
    textAlign: 'center'
  }
});
