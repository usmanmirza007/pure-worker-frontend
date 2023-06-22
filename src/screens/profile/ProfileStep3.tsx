import React, { useState } from 'react';
import {
  View
} from 'react-native';
import { ScrollView, } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../constants/navigation';
import Header from '../../components/Header';
import images from '../../constants/images';
import Button from '../../components/Button';
import TextWrapper from '../../components/TextWrapper';
import commonStyle from '../../constants/commonStyle';
import colors from '../../constants/colors';
import { generalStyles } from '../../constants/generalStyles';
import ProfileStepWrapper from '../../components/ProfileStepWrapper';
import TextInputs from '../../components/TextInputs';

const ProfileStep3 = () => {
  const navigation = useNavigation<StackNavigation>();
  const [address, setAddress] = useState('');
  return (
    <View style={[{ flex: 1, backgroundColor: colors.greyLight },]}>
      <ScrollView>
        <Header style={{ backgroundColor: colors.greyLight }} imageStyle={{ tintColor: colors.black }} textStyle={{ color: colors.black, fontFamily: commonStyle.fontFamily.semibold }} title={'Complete your Registration'} image={images.back} />
        <ProfileStepWrapper active={'three'} />
        <View style={{ marginHorizontal: 20 }}>
          <TextWrapper children='References' fontType={'semiBold'} style={{ fontSize: 20, marginTop: 30, color: colors.black }} />
          <TextWrapper children='Who can we contact in emergency situation?' fontType={'semiBold'} style={{ fontSize: 16, marginTop: 13, color: colors.black }} />
          <TextWrapper children='Contact 1' fontType={'semiBold'} style={{ fontSize: 14, marginTop: 13, color: colors.black }} />
          <TextWrapper children='Full Name' isRequired={true} fontType={'semiBold'} style={{ fontSize: 13, marginTop: 13, color: colors.black }} />
          <TextInputs style={{ marginTop: 10, backgroundColor: colors.greyLight1 }} labelText={''} state={address} setState={setAddress} />

          <TextWrapper children='Relationship to you' isRequired={true} fontType={'semiBold'} style={{ fontSize: 13, marginTop: 13, color: colors.black }} />
          <TextInputs style={{ marginTop: 10, backgroundColor: colors.greyLight1 }} labelText={''} state={address} setState={setAddress} />

          <TextWrapper children='Phone Number' isRequired={true} fontType={'semiBold'} style={{ fontSize: 13, marginTop: 13, color: colors.black }} />
          <TextInputs style={{ marginTop: 10, backgroundColor: colors.greyLight1 }} labelText={''} state={address} setState={setAddress} />

          <TextWrapper children='Email Address' isRequired={true} fontType={'semiBold'} style={{ fontSize: 13, marginTop: 13, color: colors.black }} />
          <TextInputs style={{ marginTop: 10, backgroundColor: colors.greyLight1 }} labelText={''} state={address} setState={setAddress} />

          <TextWrapper children='Address' isRequired={true} fontType={'semiBold'} style={{ fontSize: 16, marginTop: 20, color: colors.black }} />
          <View style={{
            height: 130,
            borderRadius: 8,
            backgroundColor: colors.greyLight1,
            marginTop: 13
          }}>
            <TextInputs styleInput={{ color: colors.white, paddingHorizontal: 18, }} style={{ marginTop: 0, backgroundColor: colors.greyLight1 }}
              labelText={'Introduce yourself and enter your profile description.'}
              state={address}
              setState={setAddress}
              multiline={true}
              nbLines={5} />
          </View>
          <TextWrapper children='Contact 2' fontType={'semiBold'} style={{ fontSize: 14, marginTop: 13, color: colors.black }} />
          <TextWrapper children='Full Name' isRequired={true} fontType={'semiBold'} style={{ fontSize: 13, marginTop: 13, color: colors.black }} />
          <TextInputs style={{ marginTop: 10, backgroundColor: colors.greyLight1 }} labelText={''} state={address} setState={setAddress} />

          <TextWrapper children='Relationship to you' isRequired={true} fontType={'semiBold'} style={{ fontSize: 13, marginTop: 13, color: colors.black }} />
          <TextInputs style={{ marginTop: 10, backgroundColor: colors.greyLight1 }} labelText={''} state={address} setState={setAddress} />

          <TextWrapper children='Phone Number' isRequired={true} fontType={'semiBold'} style={{ fontSize: 13, marginTop: 13, color: colors.black }} />
          <TextInputs style={{ marginTop: 10, backgroundColor: colors.greyLight1 }} labelText={''} state={address} setState={setAddress} />

          <TextWrapper children='Email Address' isRequired={true} fontType={'semiBold'} style={{ fontSize: 13, marginTop: 13, color: colors.black }} />
          <TextInputs style={{ marginTop: 10, backgroundColor: colors.greyLight1 }} labelText={''} state={address} setState={setAddress} />

          <TextWrapper children='Address' isRequired={true} fontType={'semiBold'} style={{ fontSize: 16, marginTop: 20, color: colors.black }} />
          <View style={{
            height: 130,
            borderRadius: 8,
            backgroundColor: colors.greyLight1,
            marginTop: 13
          }}>
            <TextInputs styleInput={{ color: colors.white, paddingHorizontal: 18, }} style={{ marginTop: 0, backgroundColor: colors.greyLight1 }}
              labelText={'Introduce yourself and enter your profile description.'}
              state={address}
              setState={setAddress}
              multiline={true}
              nbLines={5} />
          </View>

          <View style={[generalStyles.rowBetween, { marginTop: 40, marginBottom: 35 }]}>
            <Button onClick={() => { }}
              style={{ width: 130, backgroundColor: colors.lightBlack }}
              textStyle={{ color: colors.primary }}
              text={`Save`} />
            <Button onClick={() => { navigation.navigate('ProfileStep4') }}
              style={{ width: 90, backgroundColor: colors.lightBlack }}
              textStyle={{ color: colors.primary }}

              text={`Next`} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default ProfileStep3;
