import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'native-base';

const backButton = (navigation) => {
  if (navigation.state.routeName === 'About') {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Icon
          name="ios-arrow-back"
          style={{ paddingLeft: 16, color: 'white' }}
        />
      </TouchableWithoutFeedback>
    );
  }
  return <View />;
};

const navOptions = ({ navigation }) => {
  return {
    headerTitle: 'Find Phone Country',
    headerStyle: {
      backgroundColor: '#C62828'
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent: 'space-between',
      alignSelf: 'center',
      textAlign: 'center',
      marginLeft: 16,
      flex: 1,
      flexGrow: 1
    },
    headerRight: () => (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('About')}>
        <Icon
          name="ios-help-circle-outline"
          style={{ paddingRight: 16, color: 'white' }}
        />
      </TouchableWithoutFeedback>
    ),
    headerLeft: () => backButton(navigation)
  };
};

export default navOptions;
