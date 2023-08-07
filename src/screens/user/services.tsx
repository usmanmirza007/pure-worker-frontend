import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {StackNavigation} from '../../constants/navigation';
import images from '../../constants/images';
import tw from 'twrnc';
import Textcomp from '../../components/Textcomp';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {perHeight} from '../../utils/position/sizes';
import colors from '../../constants/colors';
import TextInputs from '../../components/TextInput2';

const Services = () => {
  const navigation = useNavigation<StackNavigation>();
  const dispatch = useDispatch();
  const [searchModal, setsearchModal] = useState(false);
  const [searchInput, setsearchInput] = useState('');

  const dummyData = [
    'Plumbing',
    'Furniture',
    'Painting',
    'Baking',
    'Home  Tutoring',
    'Plumbing',
    'Furniture',
    'Painting',
    'Baking',
    'Home  Tutoring',
  ];
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
        {/* <View
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
              text={'Services'}
              size={17}
              lineHeight={17}
              color={'#000413'}
              fontFamily={'Inter-SemiBold'}
            />
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={images.search}
              style={{height: 25, width: 25}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View> */}

        {!searchModal ? (
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
                text={'Close to you'}
                size={17}
                lineHeight={17}
                color={'#000413'}
                fontFamily={'Inter-SemiBold'}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setsearchModal(true);
              }}>
              <Image
                source={images.search}
                style={{height: 25, width: 25}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={[
              tw`items-center justify-center`,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              },
            ]}>
            <TouchableOpacity onPress={() => setsearchModal(false)}>
              <Image
                source={images.cross}
                style={{height: 20, width: 20, tintColor:  'black'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TextInputs
              style={{marginTop: 10, width: '70%'}}
              labelText={'Search for service'}
              state={searchInput}
              setState={setsearchInput}
            />
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={images.search}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={tw``}>
          <View style={tw`mt-3 ml-4 mb-3 px-4`}>
            <Textcomp
              text={'Popular Services'}
              size={22}
              lineHeight={26}
              color={'#000413'}
              fontFamily={'Inter-SemiBold'}
            />
          </View>

          <View style={tw`px-4`}>
            {dummyData.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('_Services', {service: item});
                  }}
                  key={index}
                  style={[
                    tw`bg-[#2D303C] border-2 border-[#FFC727]`,
                    {marginTop: index === 0 ? 0 : perHeight(15)},
                  ]}>
                  <View style={tw`p-1.5`}>
                    <Textcomp
                      text={item}
                      size={14}
                      lineHeight={16}
                      color={'#FFFFFF'}
                      fontFamily={'Inter-SemiBold'}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
            <View style={[tw` mt-2 bg-[${colors.darkPurple}]`, {height: 3}]} />
          </View>
        </View>
        <View style={tw`h-20`} />
      </ScrollView>
    </View>
  );
};

export default Services;
