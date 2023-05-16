import React, { useState, useEffect, useRef } from 'react';
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
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images';

import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';

import {
  MenuProvider,
  Menu,
  MenuOption,
  MenuTrigger,
  MenuOptions,
} from 'react-native-popup-menu';

const { width, height } = Dimensions.get('screen');

export default function LoginNumberFunc() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState(false);
  const [countryCode, setCountryCode] = useState(1);
  const [seconds, setSeconds] = useState(120);

  const navigation = useNavigation();
  const dispatch = useDispatch()

  // const [login, { isLoading }] = useLoginMutation();
  
  const menu = useRef()
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const onPhoneChange = (text) => {
    if (text.length == 4 && phoneNumber.length < 4) {
      text = text + ' ';
    } else if (text.length === 4 && phoneNumber.length > 4) {
      text = text.slice(0, 3);
    }
    setPhoneNumber(text)
  }
  const validatePhoneNo = (phone) => {
    phone = phone.replace(/\s/g, '');
    var re;
    if (countryCode == 92) {
      re = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    } else if (countryCode == 91) {
      re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    } else {
      re = /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/;
    }
    return re.test(phone);
  };

  useEffect(() => {
    const user = auth().currentUser
    console.log('user', user);
  }, [])

  const onContinue = () => {
    const phoneNo =
      '+' + String(countryCode) + ' ' + phoneNumber;
    if (validatePhoneNo(phoneNo)) {
      navigation.navigate('OtpInput', {phoneNo: phoneNo});
    } else if (phoneNumber) {
      ToastAndroid.show('Please enter phone number or email', ToastAndroid.SHORT);
    }
  };
  const style = {
    rowCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
  };
  const CenterRowView = ({ style: _style, children }) => (
    <View style={[_style, { ...style.rowCenter }]}>{children}</View>
  );

  var selectedFlag;
  if (countryCode == 92) {
    selectedFlag = images.star;
  } else if (countryCode == 91) {
    selectedFlag = images.star_2;
  } else {
    selectedFlag = images.star;
  }

  var numberMaxCount;
  if (countryCode == 92) {
    numberMaxCount = 11;
  } else if (countryCode == 91) {
    numberMaxCount = 10;
  } else {
    numberMaxCount = 11;
  }

  return (
    <MenuProvider>
      <ScrollView keyboardShouldPersistTaps='handled' style={{ backgroundColor: '#fff' }}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <View style={{ marginHorizontal: 25 }}>
          <CenterRowView
            style={{
              marginTop:
                StatusBar.currentHeight + 20,
            }}>
            <Text
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                fontSize: 30,
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
              SMART HR
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                top: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={images.cross} />
            </TouchableOpacity>
          </CenterRowView>
          <CenterRowView style={{ marginTop: 40, marginHorizontal: 10 }}>
            <Text
              style={{ fontSize: 17, textAlign: 'center', fontWeight: 'normal' }}>
              Enter your phone number or email to continue
            </Text>
          </CenterRowView>
          <View style={{ marginTop: 69 }}>
            <Text style={{ fontSize: 13, fontWeight: 'normal' }}>
              Mobile no.
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                marginRight: 17,
                marginTop: 30,
                width: 80,
                borderBottomColor: 'rgba(0, 0, 0, 0.12)',
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}>
              <Menu
                ref={menu}
                onSelect={(value) => setCountryCode(value)}>
                <MenuTrigger />
                <MenuOptions
                  customStyles={{
                    optionsWrapper: {
                      width: 'auto',
                    },
                    optionsContainer: {
                      width: 'auto',
                    },
                  }}>
                  <MenuOption value={1}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        style={{
                          flexDirection: 'column',
                          alignSelf: 'center',
                          width: 30,
                          height: 20,
                        }}
                        source={images.star}
                      />
                      <Text
                        style={{
                          paddingVertical: 0,
                          paddingLeft: 5,
                          flexGrow: 1,
                          flexDirection: 'column',
                          alignSelf: 'center',
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 17,
                          fontWeight: '900'
                        }}>
                        +1
                      </Text>
                    </View>
                  </MenuOption>
                  <MenuOption value={91}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        style={{
                          flexDirection: 'column',
                          alignSelf: 'center',
                          width: 30,
                          height: 20,
                        }}
                        source={images.star_2}
                      />
                      <Text
                        style={{
                          paddingVertical: 0,
                          paddingLeft: 5,
                          flexGrow: 1,
                          flexDirection: 'column',
                          alignSelf: 'center',
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 17,
                          fontWeight: '900'
                        }}>
                        +91
                      </Text>
                    </View>
                  </MenuOption>
                  <MenuOption value={92}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        style={{
                          flexDirection: 'column',
                          alignSelf: 'center',
                          width: 30,
                          height: 20,
                        }}
                        source={images.star}
                      />
                      <Text
                        style={{
                          paddingVertical: 0,
                          paddingLeft: 5,
                          flexGrow: 1,
                          flexDirection: 'column',
                          alignSelf: 'center',
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 17,
                          fontWeight: '900'
                        }}>
                        +92
                      </Text>
                    </View>
                  </MenuOption>
                </MenuOptions>
              </Menu>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => menu.current?.open()}>
                <Image
                  style={{
                    flexDirection: 'column',
                    alignSelf: 'center',
                    width: 30,
                    height: 20,
                  }}
                  source={selectedFlag}
                />
                <Text
                  style={{
                    paddingVertical: 0,
                    paddingLeft: 5,
                    flexGrow: 1,
                    flexDirection: 'column',
                    alignSelf: 'center',
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 17,
                    fontWeight: '900'
                  }}>
                  +{countryCode}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexGrow: 1,
                marginTop: 30,
                borderBottomColor: 'rgba(0, 0, 0, 0.12)',
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}>
              <TextInput
                placeholder="0123 456789"
                value={phoneNumber}
                onChangeText={onPhoneChange}
                style={{
                  paddingVertical: 0,
                  flexGrow: 1,
                  flexDirection: 'column',
                  alignSelf: 'center',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 17,
                }}
                maxLength={numberMaxCount}
                keyboardType={
                  Platform.OS == 'android' ? 'numeric' : 'number-pad'
                }
              />
            </View>
          </View>
          <View style={{ marginTop: 25 }}>
            <Image
              source={images.menu}
              style={{ resizeMode: 'contain', width: '100%' }}
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Text style={{ fontSize: 13, fontWeight: 'normal' }}>
              Sign in with email
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                flexGrow: 1,
                marginTop: 30,
                borderBottomColor: 'rgba(0, 0, 0, 0.12)',
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}>
              <TextInput
                placeholder="john.doe@gmail.com"
                value={email}
                onChangeText={(value) => {
                  setEmail(value)
                }}
                style={{
                  paddingVertical: 0,
                  flexGrow: 1,
                  flexDirection: 'column',
                  alignSelf: 'center',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 17,
                }}
                keyboardType={'email-address'}
              />
            </View>
          </View>


          <View>
            <Button
              onClick={onContinue}
              style={{ marginTop: 40 }}
              text={'Continue'}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EmailSignup')} style={{ marginTop: 25, alignItems: 'center', alignSelf: 'center', }}>
            <Text style={{ fontSize: 13, fontWeight: 'normal', color: 'red' }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MenuProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
