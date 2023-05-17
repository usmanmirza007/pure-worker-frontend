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
import { validateEmail } from '../constants/utils';

const { width, height } = Dimensions.get('screen');

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [seconds, setSeconds] = useState(120);

  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {

        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleLogin = () => {

    if (email && password) {
      if (!validateEmail(email)) {
        Snackbar.show({
          text: 'Please enter valid email', duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#88087B',
        });
      } else {
        const loginData = {
          email: email.toLowerCase().trim(),
          password: password,
        }
        login(loginData).unwrap()
          .then((data) => {
            if (data && data.token) {
              Snackbar.show({
                text: `${data.type.toLowerCase()} has been login succssfuly`, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#88087B',
              });
              dispatch(loggedIn({
                token: data.token,
                type: data.type
              }))
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

  }
  return (
    <ScrollView contentContainerStyle={{ height: height }} style={{ flex: 1, backgroundColor: '#000' }}>

      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#000"
      />
      <Image source={images.cross} style={{ height: 20, width: 20, marginLeft: 25, marginTop: 40, }} resizeMode='contain' />

      <View style={{ flex: 1 }}>
        <View>
          <View style={{}} >
            <Text style={{ fontSize: 36, fontFamily: commonStyle.fontFamily.bold, color: '#fff', marginTop: 75, marginLeft: 25 }}>Login</Text>
            <Text style={{ fontSize: 14, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 5, marginLeft: 25 }}>Input your email to log in</Text>
          </View>
          <View style={{ marginHorizontal: 25 }}>
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 60 }}>Email</Text>
            <TextInputs style={{ marginTop: 10 }} labelText={'Enter Email'} state={email} setState={setEmail} keyBoardType={'email-address'} />
            <Text style={{ fontSize: 16, fontFamily: commonStyle.fontFamily.medium, color: '#fff', marginTop: 15 }}>Password</Text>
            <TextInputs style={{ marginTop: 10 }} secure={true} labelText={'Enter Password'} state={password} setState={setPassword} />
          </View>
        </View>
        {/* {!isLoading ?  */}
        <View style={{ marginHorizontal: 25, marginTop: 75 }}>
          <Button onClick={() => {
            handleLogin()
          }}

            text={`Login`} />
        </View>
        {/* : <ActivityIndicator style={{ marginBottom: 30 }} size={'large'} color={'green'} />} */}
        <Text style={{ fontSize: 13, marginTop: 16, textAlign: 'center', color: '#fff', fontFamily: commonStyle.fontFamily.regular }}>Don’t have an account? <Text onPress={() => navigation.navigate('Signup')} style={{ fontSize: 13, textDecorationLine: 'underline', color: colors.primary, fontFamily: commonStyle.fontFamily.regular }}>Register</Text></Text>
      </View>
    </ScrollView >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
