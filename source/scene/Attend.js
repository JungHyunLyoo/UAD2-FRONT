import {Calendar} from 'react-native-calendars';

import React, {useState} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {LocaleConfig} from 'react-native-calendars';
import TimeList from '../component/scene/attend/TimeList';
import Utility from '../Utility';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

const datas = {};
const Attend = () => {
  const [selectDate, setSelectDate] = useState(false);

  const markSelectDate = {};
  markSelectDate[selectDate] = {
    selected: true,
    // marked: true,
    selectedColor: Utility.color.primary,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        markedDates={markSelectDate}
        onDayPress={date => {
          setSelectDate(date.dateString);
        }}
      />
      <View style={styles.attendList}>
        {selectDate ? <TimeList /> : <Text>날짜를 선택해주세요</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  attendList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Attend;
