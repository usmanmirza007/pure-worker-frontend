import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  StatusBar,
  View,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';

import TextInputs from '../components/TextInputs';
import { useDispatch } from 'react-redux';
import commonStyle from '../constants/commonStyle';
import Button from '../components/Button';
import Snackbar from 'react-native-snackbar';
import MyStatusBar from '../components/MyStatusBar';
import { useLoginMutation } from '../store/slice/api';
import { loggedIn } from '../store/reducer/mainSlice';
import colors from '../constants/colors';
import auth from '@react-native-firebase/auth';
import { BUNDLE_ID, BUNDLE_ID_IOS } from '../constants/userType';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('screen');

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState(false);
  const [seconds, setSeconds] = useState(120);

  const navigation = useNavigation();
  const dispatch = useDispatch()

  // const [login, { isLoading }] = useLoginMutation();

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {

        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const sendSignInLink = async (email) => {
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
      canHandleCodeInApp: true,
      url: 'https://pureworker.page.link/ezHe/',

      iOS: {
        bundleId: BUNDLE_ID_IOS,
        installApp: true,
        minimumVersion: '1',
      },
      android: {

        packageName: BUNDLE_ID,
        // installApp: false,
        minimumVersion: '1',
      },
      navigation: {
        forcedRedirectEnabled: true
      }
    };

    await AsyncStorage.setItem('emailForSignIn', email);
    await auth().sendSignInLinkToEmail(email, actionCodeSettings).then((test) => {
      // navigation.navigate('Confirmation')
      console.log('fofofo', test);
      // setLoading(false)
    }).catch((e) => {
      console.log('error', e);
    });

  };

  const handleLogin = () => {

    // if (email && password) {
    //   if (!validateEmail(email)) {
    //     Snackbar.show({
    //       text: 'Please enter valid email', duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
    //     });
    //   } else {
    //     const loginData = {
    //       email: email,
    //       password: password,
    //     }
    //     login(loginData).unwrap()
    //       .then((data) => {
    //         if (data && data.token) {
    //           Snackbar.show({
    //             text: `${data.type.toLowerCase()} has been login succssfuly`, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
    //           });
    //           dispatch(loggedIn({
    //             token: data.token,
    //             type: data.type
    //           }))
    //         }
    //       })
    //       .catch((error) => {
    //         console.log('err', error);
    //         Snackbar.show({
    //           text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#24A9DF',
    //         });
    //       });
    //   }
    // } else {
    //   Snackbar.show({
    //     text: 'Please fill all fields',
    //     duration: Snackbar.LENGTH_SHORT, textColor: '#fff',
    //     backgroundColor: '#24A9DF',
    //   });
    // }

  }
  return (
    <ScrollView contentContainerStyle={{ height: height }} style={{ flex: 1, backgroundColor: '#000' }}>

      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#000"
      />
      {!login && <Image source={images.cross} style={{ height: 20, width: 20, marginLeft: 25, marginTop: 40, }} resizeMode='contain' />}

      {!login ? <View style={{ flex: 1 }}>
        <View>
          <View style={{}} >
            <Text style={{ fontSize: 36, fontFamily: commonStyle.fontFamily.bold, color: '#fff', marginTop: 75, marginLeft: 25 }}>Login</Text>
            <Text style={{ fontSize: 14, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 5, marginLeft: 25 }}>Input your email to log in</Text>
          </View>
          <View style={{ marginHorizontal: 25 }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 60 }}>Email</Text>
            <TextInputs style={{ marginTop: 17 }} labelText={'Enter Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
          </View>
        </View>
        {/* {!isLoading ?  */}
        <View style={{ marginHorizontal: 25, marginTop: 75 }}>
          <Button onClick={() => {
            sendSignInLink(email)
            setLogin(true)
            // console.log('sdsd');
          }}

            text={`GET LINK`} />
        </View>
        {/* : <ActivityIndicator style={{ marginBottom: 30 }} size={'large'} color={'green'} />} */}
        <Text style={{ fontSize: 13, marginTop: 16, textAlign: 'center', color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>Don’t have an account? <Text onPress={() => navigation.navigate('Signup')} style={{ fontSize: 13, textDecorationLine: 'underline', color: colors.primary, fontFamily: commonStyle.fontFamily.regular }}>Register</Text></Text>
      </View>
        :
        <View style={{ flex: 1, justifyContent: 'center', }}>
          <Text style={{ fontSize: 20, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginHorizontal: 25, marginTop: 60 }}>Click on the link sent to your email to log in </Text>

          {/* {!isLoading ?  */}
          <View style={{ marginHorizontal: 25, marginTop: 50 }}>
            <Button onClick={() => {
              // handleLogin()
              setLogin(true)
            }}
              disable={seconds > 0 ? true : false}
              textStyle={{ color: seconds > 0 ? '#FFFFFF59' : '#fff' }}
              text={`RESEND LINK`} />
          </View>
          {/* : <ActivityIndicator style={{ marginBottom: 30 }} size={'large'} color={'green'} />} */}
          <Text style={{ fontSize: 13, marginTop: 16, textAlign: 'center', color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>{seconds === 0 ? '00:00' : seconds}</Text>
          <Text style={{ fontSize: 13, marginTop: 50, textAlign: 'center', color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>Don’t have an account? <Text onPress={() => navigation.navigate('Signup')} style={{ fontSize: 13, textDecorationLine: 'underline', color: colors.primary, fontFamily: commonStyle.fontFamily.regular }}>Register</Text></Text>
        </View>

      }
    </ScrollView >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
