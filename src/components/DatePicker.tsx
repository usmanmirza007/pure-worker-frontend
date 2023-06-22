import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AndroidMode, IOSMode } from '../constants/navigation';
import colors from '../constants/colors';



const DateTimesPicker = ({ updateDate }: any) => {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<IOSMode | AndroidMode>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    updateDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 15,
          marginTop: 10,
        }}
        hitSlop={{ top: 20, bottom: 20 }}
        onPress={showDatePicker}>
        <Text
          style={{
            fontSize: 15,
            color: colors.black,
          }}>
          {moment(date).format('DD-MM-YYYY')}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          // is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
export default DateTimesPicker;
