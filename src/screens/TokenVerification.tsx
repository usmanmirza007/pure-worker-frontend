import React, { useEffect, useState } from "react"; 
import { Alert, ScrollView, Text, KeyboardAvoidingView, Platform } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import OtpInputs from "react-native-otp-inputs";
import { useDispatch } from "react-redux";
import Snackbar from "react-native-snackbar";

import Loading from '../components/SpinnerScreen';
import Button from "../components/Button";
import colors from "../constants/colors";
import MyStatusBar from "../components/MyStatusBar";
import { useVerifyOtpMutation } from "../store/slice/api";
import { loggedIn } from "../store/reducer/mainSlice";
type Route = {
  key: string
  name: string
  params: {
    email: string
  }
}
const TokenVerification = () => {

  const route: Route = useRoute()
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [verification, { isLoading }] = useVerifyOtpMutation();

  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {

        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const veriFyOTP = async () => {
    console.log('create');
    if (code.length < 6) {
      Alert.alert("Alert!!", "Enter a valid OTP.")
      return;
    }
    const loginData = {
      email: route.params?.email,
      otp: code

    }
    verification(loginData).unwrap()
      .then((data: any) => {
        if (data) {
          Snackbar.show({
            text: `${data.type.toLowerCase()} has been login succssfuly`, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#88087B',
          });
          dispatch(loggedIn({
            token: data.token,
            type: data.type
          }))
        }
      })
      .catch((error: any) => {
        console.log('err', error);
        Snackbar.show({
          text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#88087B',
        });
      });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#000"
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#000' }}>
        <Text style={{ fontSize: 27, color: '#fff', alignSelf: 'center', marginTop: 50 }}>OTP verification</Text>
        <Text style={{ color: '#fff', alignSelf: 'center', marginTop: 8 }}>We sent an OTP to your email</Text>
        <Text style={{ color: '#fff', alignSelf: 'center' }}>address! <Text style={{ color: colors.primary, alignSelf: 'center' }}>{route.params?.email}</Text></Text>
        <OtpInputs
          style={{ flexDirection: 'row', marginLeft: 15, marginTop: 80, alignSelf: 'center' }}
          inputContainerStyles={{ margin: 5, borderRadius: 8, backgroundColor: '#fff', alignSelf: 'center' }}
          inputStyles={[{ fontSize: 32, height: 56, width: 51, textAlign: 'center', paddingHorizontal: 15 }]}
          //clearTextOnFocus
          handleChange={setCode}
          keyboardType="phone-pad"
          numberOfInputs={6}
          //underlineColorAndroid={PRIMARY_COLOR3}
          selectionColor={'transparent'}
          importantForAutofill="yes"
          //ref={otpRef}
          autofillFromClipboard={false}
        //focusStyles={{borderBottomWidth:2,borderBottomColor:PRIMARY_COLOR3}}
        />
        <Text style={{ color: '#fff', alignSelf: 'center', marginTop: 24 }}>Don't receive your code? <Text style={{ color: colors.primary }}>Resend</Text></Text>
        <Button text={"Submit"} onClick={() => {
          veriFyOTP()
        }} textStyle={{ color: '#fff' }} style={{ backgroundColor: colors.parpal, marginHorizontal: 25, marginTop: 312, }} />
      </ScrollView>
      {loading && <Loading />}
    </KeyboardAvoidingView>
  );
}

export default TokenVerification;