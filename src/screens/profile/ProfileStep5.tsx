import React, { useState } from 'react';
import {
  Image,
  View,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { useCreateServiceMutation, useLoginMutation } from '../../store/slice/api';
import Snackbar from 'react-native-snackbar';

type Route = {
  key: string
  name: string
  params: {
    serviceId: string
  }
}

const ProfileStep5 = () => {
  const route: Route = useRoute()

  const navigation = useNavigation<StackNavigation>();
  const [date, setDate] = useState(new Date());
  const handleDate = (dateTime: any) => { setDate(dateTime) };
  const [time, setTime] = useState(new Date());
  const handleTime = (dateTime: any) => { setTime(dateTime) };

  const [login] = useLoginMutation();
  const [createService] = useCreateServiceMutation();


  const handleProfileSetup = () => {
    if (date && time) {

      const profileData = {
        scheduleDate: date.getTime(),
        appointmentTime: time.getTime(),
        serviceId: route?.params?.serviceId,
      }
      createService(profileData).unwrap()
        .then((data: any) => {
          if (data) {
            navigation.navigate('Homes')
          }
        })
        .catch((error: any) => {
          console.log('err', error);
          Snackbar.show({
            text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#88087B',
          });
        });
    } else {
      Snackbar.show({
        text: 'Please fill all fields',
        duration: Snackbar.LENGTH_SHORT, textColor: '#fff',
        backgroundColor: '#88087B',
      });
    }
  }
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
              <DateTimesPicker updateDate={handleDate} />
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
              <DateTimesPicker updateDate={handleTime} type={'time'} />
            </View>
            <Image
              source={images.time}
              resizeMode={'contain'}
              style={{ width: 15, height: 15, marginRight: 20 }}
            />
          </TouchableOpacity>
          <Button onClick={() => { handleProfileSetup() }}
            style={{ marginHorizontal: 40, marginTop: 140, backgroundColor: colors.lightBlack }}
            textStyle={{ color: colors.primary }}
            text={`Schedule`} />
        </View>
      </ScrollView>
    </View>
  );
};


export default ProfileStep5;
