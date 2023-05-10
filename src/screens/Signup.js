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
import { BUNDLE_ID, BUNDLE_ID_IOS } from '../constants/userType';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import RadioButton from 'react-native-simple-radio-button';
var radio_props = [
  { label: 'Create a customer profile', value: 0 },
  { label: 'Create a vendor profile', value: 1 }
];
const { width, height } = Dimensions.get('window');
export default function Signup() {
  const [email, setEmail] = useState('');
  const [second, setSecond] = useState(false);

  const [eventOpen, setEventOpen] = useState(false);
  const [eventValue, setEventValue] = useState(null);
  const [eventItems, setEventItems] = useState([
    { label: 'Online', value: 'Online' },
    { label: 'Offline', value: 'Offline' },
    { label: 'Both', value: 'Both' },
  ]);
  const navigation = useNavigation();

  const handleSignup = () => {
    if (first) {
      navigation.navigate("CustomerSignup")
    } else if (second) {
      navigation.navigate("VenderSignup")
    }
  }


  const sendSignInLink = async () => {
    if (!email) {
      Snackbar.show({
        text: 'Please enter your email address',
        duration: Snackbar.LENGTH_SHORT, textColor: '#fff',
        backgroundColor: '#24A9DF',
      });
      return
    }
    // setLoading(true)
    const actionCodeSettings = {
      handleCodeInApp: true,
      // canHandleCodeInApp: true,
      url: 'https://pureworker.page.link/ezHe',

      iOS: {
        bundleId: BUNDLE_ID_IOS,
        installApp: true,
        minimumVersion: '1',
      },
      android: {

        packageName: BUNDLE_ID,
        installApp: true,
        minimumVersion: '1',
      },
      navigation: {
        forcedRedirectEnabled: true
      }
    };

    await AsyncStorage.setItem('emailForSignIn', email);
    await auth().sendSignInLinkToEmail(email, actionCodeSettings).then((test) => {
      // navigation.navigate('Confirmation')
      console.log('singup fofofo', test);
      // setLoading(false)
    }).catch((e) => {
      console.log('error', e);
    });

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
          <Button text={'Freelancer'} textStyle={{ color: '#000', fontSize: 20 }} style={{ flex: 1, borderRadius: 8, height: 45, backgroundColor: colors.white, }} />
          <Button text={'Business'} textStyle={{ color: '#fff', fontSize: 20, fontFamily: 'bold' }} style={{ flex: 1, borderRadius: 8, height: 45, backgroundColor: colors.parpal }} />
        </View>

        <View style={{ marginHorizontal: 25 }}>
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 60 }}>Business Name</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>CAC Reg. No</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Location</Text>
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
              backgroundColor: "#0505050D",
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
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Address</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
          <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Business Email</Text>
          <TextInputs style={{ marginTop: 17 }} labelText={'Enter Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
        </View>

        {/* {!isLoading ?  */}
        <View style={{ marginHorizontal: 25, marginTop: 75 }}>
          <Button onClick={() => {
            // handleLogin()
            sendSignInLink()
          }}

            text={`GET LINK`} />
        </View>
        {/* : <ActivityIndicator style={{ marginBottom: 30 }} size={'large'} color={'green'} />} */}
      </View>
      <Text style={{ fontSize: 13, marginTop: 16, textAlign: 'center', color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>Already have an account? <Text onPress={() => navigation.navigate('Login')} style={{ fontSize: 13, textDecorationLine: 'underline', color: colors.primary, fontFamily: commonStyle.fontFamily.regular }}>Login</Text></Text>



    </ScrollView >
  );
}
const styles = StyleSheet.create({

});
