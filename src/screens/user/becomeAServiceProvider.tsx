import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {StackNavigation} from '../../constants/navigation';
import images from '../../constants/images';
import tw from 'twrnc';
import Textcomp from '../../components/Textcomp';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { perHeight } from '../../utils/position/sizes';

const BecomeAServiceProvider = () => {
  const navigation = useNavigation<StackNavigation>();
  const dispatch = useDispatch();
  return (
    <View style={[{flex: 1, backgroundColor: '#EBEBEB'}]}>
      <ScrollView>
        <View
          style={{
            marginTop:
              Platform.OS === 'ios'
                ? getStatusBarHeight(true)
                : StatusBar.currentHeight &&
                  StatusBar.currentHeight + getStatusBarHeight(true),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={images.back}
              style={{height: 25, width: 25}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={tw`mx-auto`}>
            <Textcomp
              text={'Become A Service Provider'}
              size={17}
              lineHeight={17}
              color={'#000413'}
              fontFamily={'Inter-SemiBold'}
            />
          </View>
        </View>

        <View style={tw`flex flex-1`}>

        <View
            style={[
              tw` px-2 py-4 w-[90%] mx-auto `,
              {marginTop: perHeight(144), borderRadius: 5},
            ]}>
            <Textcomp
              text={'A service provider can be a freelancer or a business. This is someone or a company who offers a service to customers in exchange for payment.'}
              size={14}
              color={'#000000'}
              style={[tw`ml-3`, {lineHeight: 14}, {fontWeight: '500'}]}
            />
          </View>
        <TouchableOpacity
            onPress={() => {}}
            style={[
              tw` px-2 py-4  mx-auto `,
              {marginTop: perHeight(48), borderRadius: 5},
            ]}>
            <Textcomp
              text={'Register as a Service Provider'}
              size={14}
              color={'#88087B'}
              style={[tw`ml-3`, {lineHeight: 14}, {fontWeight: '500'}]}
            />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

export default BecomeAServiceProvider;
