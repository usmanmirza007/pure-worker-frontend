import React, { useState } from 'react';
import {
  Image,
  View,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../constants/navigation';
import Header from '../../components/Header';
import images from '../../constants/images';
import Button from '../../components/Button';
import TextWrapper from '../../components/TextWrapper';
import commonStyle from '../../constants/commonStyle';
import colors from '../../constants/colors';
import ProfileStepWrapper from '../../components/ProfileStepWrapper';
import DateTimesPicker from '../../components/DatePicker';
import { generalStyles } from '../../constants/generalStyles';
const ProfileStep5 = () => {
  const navigation = useNavigation<StackNavigation>();
  const [date, setDate] = useState(new Date());
  const setDateTime = (dateTime: any) => { setDate(dateTime) };

  return (
    <View style={[{ flex: 1, backgroundColor: colors.greyLight },]}>
      <ScrollView>
        <Header style={{ backgroundColor: colors.greyLight }} imageStyle={{ tintColor: colors.black }} textStyle={{ color: colors.black, fontFamily: commonStyle.fontFamily.semibold }} title={'Complete your Registration'} image={images.back} />
        <ProfileStepWrapper active={'five'} />
        <View style={{ marginHorizontal: 20 }}>
          <TextWrapper children='Schedule a Face to Face Meeting' fontType={'semiBold'} style={{ fontSize: 20, marginTop: 30, color: colors.black }} />

          <TextWrapper children='Select a Date' isRequired={true} fontType={'semiBold'} style={{ fontSize: 14, marginTop: 13, color: colors.black }} />
          <TouchableOpacity style={[generalStyles.rowBetween, {
            marginTop: 15,
            marginBottom: 10,
            backgroundColor: colors.greyLight1,
            borderRadius: 5,
            height: 50,
            width: '100%',
          }]}>
            <View style={{ marginTop: -10, width: '60%' }}>
              <DateTimesPicker updateDate={setDateTime} />
            </View>
            <Image
              source={images.calendar}
              resizeMode={'contain'}
              style={{ width: 15, height: 15, marginRight: 20 }}
            />
          </TouchableOpacity>
          <TextWrapper children='Select appointment time' isRequired={true} fontType={'semiBold'} style={{ fontSize: 14, marginTop: 13, color: colors.black }} />
          <TouchableOpacity style={[generalStyles.rowBetween, {
            marginTop: 15,
            marginBottom: 10,
            backgroundColor: colors.greyLight1,
            borderRadius: 5,
            height: 50,
            width: '100%',
          }]}>
            <View style={{ marginTop: -10, width: '60%' }}>
              <DateTimesPicker updateDate={setDateTime} type={'time'} />
            </View>
            <Image
              source={images.time}
              resizeMode={'contain'}
              style={{ width: 15, height: 15, marginRight: 20 }}
            />
          </TouchableOpacity>
          <Button onClick={() => { navigation.navigate('ProfileStep2') }}
            style={{ marginHorizontal: 40, marginTop: 140, backgroundColor: colors.lightBlack }}
            textStyle={{ color: colors.primary }}
            text={`Schedule`} />
        </View>
      </ScrollView>
    </View>
  );
};


export default ProfileStep5;
