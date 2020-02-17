import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import TimeListItem from './TimeListItem';

const startTime = 6;
const TimeList = () => {
  return (
    <ScrollView View style={styles.container}>
      {[...Array(16)].map((d, index) => {
        return (
          <TimeListItem index={index} key={`Attend-TimeList-Item-${index}`} />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  itemContainer: {
    paddingLeft: 20,
    width: '100%',
    fontSize: 30,
    height: 40,
    justifyContent: 'center',
  },
});

export default TimeList;
