/**
 * Onboarding Screen
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  Alert,
  Text
} from 'react-native';
import auth from '@react-native-firebase/auth';

import OTPRow from '../components/OTPRow';
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images';


export const OtpInput = ({ route }) => {
  const [count, setCount] = useState(120);
  const [otp, setOtp] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const [otpGenerationTime, setOtpGenerationTime] = useState(null);
  const navigation = useNavigation()
  const fakeOtp = false
  const optBox1 = useRef()
  const otpBox2 = useRef()
  const otpBox3 = useRef()
  const otpBox4 = useRef()
  const otpBox5 = useRef()
  const otpBox6 = useRef()
  const otpBoxes = Array.apply(null, Array(6)).map(function () { });

  const mod = () => {
    // const { count } = state;
    const sec = count % 60;
    const res = count - sec;
    const mint = res / 60;
    return {
      mints: mint,
      secs: sec,
    };
  }

  useEffect(() => {
    console.log('test', route.params?.phoneNo);
    signInWithPhoneNumber(route.params?.phoneNo)
  }, []);
  const startTimer = () => {
    let myInterval = setInterval(() => {
      if (count === 0) {
        clearInterval(myInterval);
        return;
      }
      setCount(count - 1);
    }, 1000);
  }

  useEffect(() => {
    let myInterval;
    return () => {
      clearInterval(myInterval);

    };
  }, []);
  const showToast = (data) => {
    ToastAndroid.show(data, ToastAndroid.SHORT);
  };
  const signInWithPhoneNumber = async (number) => {
    // this.setState({loading: true});

    var phoneNumber = number.replace(/\s/g, '');
    console.log('phone', phoneNumber);
    try {
      var confirmation = {};
      //  if (this.fakeOtp) {
      //    confirmation = {
      //      confirm: (code) => {
      //        if (code == '123456') {
      //          return 'Logged In';
      //        } else {
      //          throw new Error('Invalid');
      //        }
      //      },
      //    };
      //  } else {
      confirmation = await auth().signInWithPhoneNumber(phoneNumber);;
      //  }
      console.log('fofof', confirmation);
      startTimer();
      setConfirm(confirmation)
      setOtpGenerationTime(Date.now())
      setCount(120)

    } catch (error) {
      console.log('error', error);
      showToast('Invalid phone number!');
    }
    // this.props.navigation.navigate('OnboardingOTP', {confirmation});
  }
  const confirmCode = async (code, clearOtp) => {
    if (Date.now() - otpGenerationTime > 120000) {
      showToast('OTP Expired');
      clearOtp();
      return;
    }
    try {
      const credential = await auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        code,
      );
      // const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
      // let userData = await auth().currentUser.linkWithCredential(credential);
      console.log('credential', credential);
      showToast('Successfully Login');
    }
    catch (error) {
      clearOtp();
      console.log("Errors", error);
      showToast('Invalid code.');
    }
  }

  function onAuthStateChanged(user) {
    console.log('user fofof', user);
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const time = mod();

  return (
    <View style={{ backgroundColor: '#fff', flexGrow: 1 }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      <View keyboardShouldPersistTaps='handled' style={{ marginHorizontal: 25, flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop:
              StatusBar.currentHeight + 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={images.back} />
          </TouchableOpacity>
          <Text
            fontType={'medium'}
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              fontSize: 22,
              marginLeft: 15,
            }}>
            Enter Verification Code
          </Text>
        </View>

        <View style={{ marginTop: 27, marginLeft: 28, marginHorizontal: 10 }}>
          <Text fontType={'normal'}>
            We have sent an OTP to {route.params?.phoneNo}
          </Text>
        </View>

        <OTPRow style={{ marginTop: 27, marginLeft: 28, marginHorizontal: 10 }} confirmCode={confirmCode} ></OTPRow>

        {/* <View>
          <Button disabled={this.state.otp.join('').length != 6 ? true : false} onClick={() => {
            this.props.onContinue(this.state.otp.join(''));
            }} style={{ marginTop: 40 }} text={"Continue"} />
        </View> */}

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 40 }}>
          <Text
            style={{ alignSelf: 'center', marginBottom: 22.3, fontSize: 17 }}>
            {time.mints + ':' + time.secs}
          </Text>

          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
              }}>
              Didn't receive the code?
            </Text>
            <TouchableOpacity
              disabled={count != 0}
              onPress={() => {
                signInWithPhoneNumber(route.params?.phoneNo);
              }}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 14,
                  fontFamily: 'Montserrat-Regular',
                  color: count != 0 ? '#C4C5C9' : '#E95F6D',
                }}>
                Resend Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
