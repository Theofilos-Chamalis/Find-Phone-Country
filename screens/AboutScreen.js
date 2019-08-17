import React from 'react';
import { Text, View, StyleSheet, Image, Linking, Alert } from 'react-native';

export default () => {
  const onSendEmail = () => {
    Linking.openURL(
      'mailto:theofxam@gmail.com?cc=&subject=Find Phone Country&body='
    )
      .then(() => {})
      .catch(() => {
        Alert.alert(
          'Error',
          'Please make sure that you have an email client app configured and that you are connected to the internet!'
        );
      });
  };

  return (
    <View style={styles.containerStyle}>
      <Image
        source={require('../assets/globenphone.png')}
        style={styles.imageStyle}
      />
      <View style={styles.textGroupStyle}>
        <Text style={styles.textHead1Style}> Find Phone Country </Text>
        <Text style={styles.textHead2Style}>Version 3.2</Text>
        <Text style={styles.textParagraphStyle}>
          This app was created by Theofilos Chamalis. For any questions,
          suggestions or donations feel free to contact me at:
        </Text>
        <Text
          style={{
            ...styles.textParagraphStyle,
            color: 'red',
            textDecorationLine: 'underline'
          }}
          onPress={onSendEmail}>
          theofxam@gmail.com
        </Text>
      </View>
    </View>
  );
};

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
  },
  textGroupStyle: {
    flex: 6,
    paddingLeft: 24,
    paddingRight: 24
  },
  textHead1Style: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 4,
    fontSize: 30
  },
  textHead2Style: {
    color: 'white',
    textAlign: 'center',
    paddingBottom: 12,
    fontSize: 28
  },
  textParagraphStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18
  }
});
