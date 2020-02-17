import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';
import Utility from '../../../Utility';

const startTime = 6;
const TimeListItem = ({index}) => {
  const [attend, setAttend] = useState(false);

  const startHour = startTime + index;
  const endHour = startTime + index + 1;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{`${startHour < 10 ? `0${startHour}` : startHour}:00 ~ ${
          endHour < 10 ? `0${endHour}` : endHour
        }:00`}</Text>
        <View style={styles.peopleCountContainer}>
          <Text style={styles.peopleCountText}>5명</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          ...(attend ? styles.notAttendButton : styles.attendButton),
          ...styles.button,
        }}
        onPress={() => setAttend(prev => !prev)}>
        <Text style={styles.buttonText}>{attend ? '참가 해제' : '참가'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    fontSize: 30,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dfdfdf',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  peopleCountContainer: {
    backgroundColor: Utility.color.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  peopleCountText: {
    // color: 'white',
  },

  attendButton: {
    backgroundColor: Utility.color.primary,
  },
  notAttendButton: {
    backgroundColor: 'red',
  },
  button: {
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default TimeListItem;
