import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
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
import DateTimesPicker from '../components/DatePicker';
import { StackNavigation } from '../constants/navigation';

const { width, height } = Dimensions.get('window');
export default function CustomerSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneName, setPhoneName] = useState('');
  const [dob, setDob] = useState('');
  const [userType, setUserType] = useState('CUSTOMER');
  const [signup, { isLoading }] = useSignupMutation();
  const [date, setDate] = useState(new Date());
  const setDateTime = (dateTime: any) => { setDate(dateTime) };

  const navigation = useNavigation<StackNavigation>();

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
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneName,
          address: null,
          businessName: null,
          cacNo: null,
          location: null,
          dob: dob,
          userType: userType,

        }
        signup(loginData).unwrap()
          .then((data: any) => {
            if (data) {
              navigation.navigate('TokenVerification', { email: email })
            }
          })
          .catch((error: any) => {
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={images.cross} style={{ height: 20, width: 20, marginLeft: 25, marginTop: 40, }} resizeMode='contain' />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 50 }} >
          <Text style={{ fontSize: 36, fontFamily: commonStyle.fontFamily.bold, color: '#fff', marginTop: 10, marginLeft: 25 }}>Create Account</Text>
          <Text style={{ fontSize: 14, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 5, marginLeft: 25 }}>Create a free account as a Customer or Service Provider.</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30, marginHorizontal: 20, marginTop: 45 }}>
          <Button
            text={'Customer'}
            onClick={() => {
              setUserType('CUSTOMER');
            }}
            textStyle={{ color: userType === 'CUSTOMER' ? colors.white : '#000', fontSize: 20 }}
            style={{ flex: 1, borderRadius: 8, height: 45, backgroundColor: userType === 'CUSTOMER' ? colors.parpal : colors.white, }} />
          <Button
            text={'Service Provider'}
            onClick={() => {
              setUserType('PROVIDER');
            }}
            textStyle={{ color: userType === 'PROVIDER' ? colors.white : '#000', fontSize: 20, fontFamily: 'bold' }}
            style={{ flex: 1, borderRadius: 8, height: 45, backgroundColor: userType === 'PROVIDER' ? colors.parpal : colors.white, }} />
        </View>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 60 }}>First Name</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter First Name'} state={firstName} setState={setFirstName} />
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Last Name</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Last Name'} state={lastName} setState={setLastName} />
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Phone Number</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Phone'} state={phoneName} setState={setPhoneName} />
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Date of Birth</Text>
          <TouchableOpacity style={{
            marginTop: 15,
            marginBottom: 10,
            backgroundColor: '#F7F5F5',
            borderRadius: 5,
            height: 50,
            width: '100%',
          }}>

            <DateTimesPicker updateDate={setDateTime} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Email Address</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Password</Text>
          <TextInputs style={{ marginTop: 10 }} secure={true} labelText={'Enter Password'} state={password} setState={setPassword} />
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
      <Text style={{ fontSize: 13, marginTop: 16, marginBottom: 30, textAlign: 'center', color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>Already have an account? <Text onPress={() => navigation.navigate('Login')} style={{ fontSize: 13, textDecorationLine: 'underline', color: colors.primary, fontFamily: commonStyle.fontFamily.regular }}>Login</Text></Text>



    </ScrollView >
  );
}
const styles = StyleSheet.create({

});
