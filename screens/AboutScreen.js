import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'native-base';

export class AboutScreen extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <Image
          source={require('../assets/globenphone.png')}
          style={styles.imageStyle}
        />
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#212121',
    flex: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  imageStyle: {
    flex: 4,
    alignSelf: 'center',
    resizeMode: 'center'
  }
});

export default AboutScreen;
