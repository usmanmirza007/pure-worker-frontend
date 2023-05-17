import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

import commonStyle from '../constants/commonStyle';
import Button from '../components/Button';
import MyStatusBar from '../components/MyStatusBar';
import colors from '../constants/colors';
import TextInputs from '../components/TextInputs';
import DropDownPicker from 'react-native-dropdown-picker';
import Snackbar from 'react-native-snackbar';
import { useSignupMutation } from '../store/slice/api';
import { validateEmail } from '../constants/utils';

const { width, height } = Dimensions.get('window');
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cacNo, setCacNo] = useState('');
  const [address, setAddress] = useState('');
  const [userType, setUserType] = useState('BUSINESS');
  const [eventOpen, setEventOpen] = useState(false);
  const [eventValue, setEventValue] = useState(null);
  const [eventItems, setEventItems] = useState([
    { label: 'Online', value: 'Online' },
    { label: 'Offline', value: 'Offline' },
    { label: 'Both', value: 'Both' },
  ]);
  const [signup, { isLoading }] = useSignupMutation();

  const navigation = useNavigation();

  const handleSignup = async () => {

    if (!email) {
      Snackbar.show({
        text: 'Please enter your email address',
        duration: Snackbar.LENGTH_SHORT, textColor: '#fff',
        backgroundColor: '#88087B',
      });
      return
    }

    if (email && password) {
      if (!validateEmail(email)) {
        Snackbar.show({
          text: 'Please enter valid email', duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#88087B',
        });
      } else {
        const loginData = {
          email: email.toLowerCase().trim(),
          password: password,
          firstName: null,
          lastName: null,
          phoneNumber: null,
          address: address,
          businessName: name,
          cacNo: cacNo,
          location: eventValue,
          dob: null,
          password: password,
          userType: userType,

        }
        signup(loginData).unwrap()
          .then((data) => {
            if (data) {
              navigation.navigate('TokenVerification', {email: email})
              // Snackbar.show({
              //   text: `${data.type.toLowerCase()} has been login succssfuly`, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#88087B',
              // });
              // dispatch(loggedIn({
              //   token: data.token,
              //   type: data.type
              // }))
            }
          })
          .catch((error) => {
            console.log('err', error);
            Snackbar.show({
              text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#88087B',
            });
          });
      }
    } else {
      Snackbar.show({
        text: 'Please fill all fields',
        duration: Snackbar.LENGTH_SHORT, textColor: '#fff',
        backgroundColor: '#88087B',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={{}} style={{ flex: 1, backgroundColor: '#000' }}>

      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#000"
      />
      <Image source={images.cross} style={{ height: 20, width: 20, marginLeft: 25, marginTop: 40, }} resizeMode='contain' />

      <View style={{ flex: 1 }}>
        <View style={{}} >
          <Text style={{ fontSize: 36, fontFamily: commonStyle.fontFamily.bold, color: '#fff', marginTop: 75, marginLeft: 25 }}>Create Account</Text>
          <Text style={{ fontSize: 14, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 5, marginLeft: 25 }}>Create a free account as a Freelancer or Business</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30, marginHorizontal: 20, marginTop: 45 }}>
          <Button
            text={'Freelancer'}
            onClick={() => {
              setUserType('BUSINESS');
            }}
            textStyle={{ color: userType === 'BUSINESS' ? colors.white : '#000', fontSize: 20 }}
            style={{ flex: 1, borderRadius: 8, height: 45, backgroundColor: userType === 'BUSINESS' ? colors.parpal : colors.white, }} />
          <Button
            text={'Business'}
            onClick={() => {
              setUserType('FREELANCER');

            }}
            textStyle={{ color: userType === 'FREELANCER' ? colors.white : '#000', fontSize: 20, fontFamily: 'bold' }}
            style={{ flex: 1, borderRadius: 8, height: 45, backgroundColor: userType === 'FREELANCER' ? colors.parpal : colors.white, }} />
        </View>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 60 }}>Business Name</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Name'} state={name} setState={setName} />
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>CAC Reg. No</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter cac no'} state={cacNo} setState={setCacNo} />
          <View style={{
            zIndex: 1,
            // marginTop: 15,
            minHeight: 500,
            marginBottom: -400,
          }}>

            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15, marginBottom: 15 }}>Location</Text>
            <DropDownPicker
              open={eventOpen}
              value={eventValue}
              items={eventItems}
              setOpen={setEventOpen}
              setValue={setEventValue}
              setItems={setEventItems}
              showArrowIcon={false}
              zIndex={10}
              dropDownContainerStyle={{
                borderWidth: 0,
              }}
              labelStyle={{
                fontFamily: commonStyle.fontFamily.regular,
                fontSize: 14,
                color: '#9E9E9E',
              }}
              // arrowIconStyle={{

              // }}
              placeholderStyle={{
                fontFamily: commonStyle.fontFamily.regular,
                fontSize: 14,
                color: '#9E9E9E',
              }}
              style={{
                backgroundColor: "#F7F5F5",
                borderColor: '#9E9E9E14',
              }}
              listMode='FLATLIST'
              showTickIcon={false}
              textStyle={{
                color: '#9E9E9E'
              }}
              listParentLabelStyle={{
                color: '#000',
                fontSize: 16,
                fontFamily: commonStyle.fontFamily.regular
              }}

              listItemContainerStyle={{
                backgroundColor: '#F1F1F1',
                borderColor: 'red',
                opacity: 1,
                borderWidth: 0
              }}
            />
          </View>

          <View style={{ zIndex: eventOpen ? 0 : 2, }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Address</Text>
            <TextInputs style={{ marginTop: 17 }} labelText={'Enter Address'} state={address} setState={setAddress} />
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Business Email</Text>
            <TextInputs style={{ marginTop: 17 }} labelText={'Enter Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Password</Text>
            <TextInputs style={{ marginTop: 10 }} secure={true} labelText={'Enter Password'} state={password} setState={setPassword} />
          </View>
        </View>

        {/* {!isLoading ?  */}
        <View style={{ marginHorizontal: 25, marginTop: 75 }}>
          <Button onClick={() => {

            handleSignup()
          }}

            text={`Sign Up`} />
        </View>
        {/* : <ActivityIndicator style={{ marginBottom: 30 }} size={'large'} color={'green'} />} */}
      </View>
      <Text style={{ fontSize: 13, marginTop: 16, textAlign: 'center', color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>Already have an account? <Text onPress={() => navigation.navigate('Login')} style={{ fontSize: 13, textDecorationLine: 'underline', color: colors.primary, fontFamily: commonStyle.fontFamily.regular }}>Login</Text></Text>



    </ScrollView >
  );
}
const styles = StyleSheet.create({

});
