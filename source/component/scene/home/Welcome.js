import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Utility from '../../../Utility';

const Welcome = ({name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}님 반갑습니다</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: Utility.color.primary,
    borderRadius: 10,
  },
  name: {
    color: 'white',
    fontSize : 20
  },
});

export default Welcome;
