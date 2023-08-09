import {Image, View, TouchableOpacity, Platform} from 'react-native';
import {SIZES, perHeight, perWidth} from '../utils/position/sizes';
import React, {useState} from 'react';
import images from '../constants/images';
import tw from 'twrnc';
import Textcomp from './Textcomp';
import colors from '../constants/colors';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Modal from 'react-native-modal';
import {WIDTH_WINDOW} from '../constants/generalStyles';

const Orderscomponent2 = ({item, index, status}: any) => {
  const [saved, setsaved] = useState(false);
  const [InfoModal, setInfoModal] = useState(false);

  const [modalSection, setmodalSection] = useState('All');
  return (
    <>
      <View
        style={[
          tw` mt-4 mx-auto bg-[${colors.darkPurple}]`,
          {
            height: perWidth(130),
            width: SIZES.width * 0.95,
            borderWidth: 0,
            borderRadius: 5,
            paddingHorizontal: perWidth(16),
            paddingVertical: perWidth(14),
          },
        ]}>
        <View style={tw`flex flex-row `}>
          <View style={[tw``, {width: perWidth(50), height: perWidth(50)}]}>
            <Image
              resizeMode="cover"
              style={{
                width: perWidth(50),
                height: perWidth(50),
                borderRadius: perWidth(50) / 2,
              }}
              source={images.welcome}
            />
            <View
              style={[
                tw`absolute bottom-0 border-2 right-1 rounded-full`,
                {width: 8, height: 8, backgroundColor: colors.green},
              ]}
            />
          </View>
          <View style={[tw`flex-1`, {marginLeft: perWidth(12)}]}>
            <View style={[tw`flex flex-row justify-between`, {}]}>
              <View style={[tw``, {}]}>
                <Textcomp
                  text={'$ 10'}
                  size={14}
                  lineHeight={16}
                  color={colors.white}
                  fontFamily={'Inter-Bold'}
                />
              </View>
            </View>
            <View
              style={[tw``, {width: perWidth(252), marginTop: perHeight(4)}]}>
              <Textcomp
                text={
                  'Be your social media manager and provide shares and signals'
                }
                size={12}
                lineHeight={14}
                color={colors.white}
                fontFamily={'Inter-SemiBold'}
                numberOfLines={2}
              />
            </View>
            <View style={tw`ml-auto`}>
              {status === 'Inprogress' && (
                <View style={[tw``, {}]}>
                  <Textcomp
                    text={'IN PROGRESS'}
                    size={14}
                    lineHeight={16}
                    color={colors.primary}
                    fontFamily={'Inter-Bold'}
                  />
                </View>
              )}
              {status === 'Pending' && (
                <View style={[tw``, {}]}>
                  <Textcomp
                    text={'PENDING'}
                    size={14}
                    lineHeight={16}
                    color={'#C705B3'}
                    fontFamily={'Inter-Bold'}
                  />
                </View>
              )}
              {status === 'Accepted' && (
                <View style={[tw``, {}]}>
                  <Textcomp
                    text={'ACCEPTED'}
                    size={14}
                    lineHeight={16}
                    color={'#29D31A'}
                    fontFamily={'Inter-Bold'}
                  />
                </View>
              )}
              {status === 'Completed' && (
                <View style={[tw``, {}]}>
                  <Textcomp
                    text={'COMPLETED'}
                    size={14}
                    lineHeight={16}
                    color={'#FFC727'}
                    fontFamily={'Inter-Bold'}
                  />
                </View>
              )}
              {status === 'Declined' && (
                <View style={[tw``, {}]}>
                  <Textcomp
                    text={'DECLINED'}
                    size={14}
                    lineHeight={16}
                    color={'#EB001B'}
                    fontFamily={'Inter-Bold'}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        <View>
          <View style={[tw``, {width: perWidth(105), marginTop: perWidth(4)}]}>
            <Textcomp
              text={'Jennifer A.'}
              size={12}
              lineHeight={14}
              color={colors.white}
              fontFamily={'Inter-SemiBold'}
            />
          </View>
        </View>
        <View style={tw`flex flex-row mt-auto justify-between`}>
          <View>
            <Textcomp
              text={'Jan 3, 2023'}
              size={14}
              lineHeight={16}
              color={colors.white}
              fontFamily={'Inter-Bold'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setInfoModal(true);
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: perWidth(4),
                height: perWidth(12),
              }}
              source={images.menu2}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={InfoModal}
        onModalHide={() => {
          setInfoModal(false);
        }}
        style={{width: SIZES.width, marginHorizontal: 0}}
        deviceWidth={SIZES.width}
        onBackdropPress={() => setInfoModal(false)}
        swipeThreshold={200}
        swipeDirection={['down']}
        onSwipeComplete={() => setInfoModal(false)}
        onBackButtonPress={() => setInfoModal(false)}>
        {modalSection === 'All' && (
          <View style={tw` h-full w-full bg-black bg-opacity-5`}>
            <TouchableOpacity
              onPress={() => setInfoModal(false)}
              style={tw`flex-1`}
            />
            <View style={tw`h-[35%]  mt-auto bg-[#D9D9D9]`}>
              <TouchableOpacity
                onPress={() => {
                  setInfoModal(false);
                }}
                style={tw`w-15 h-1 mx-auto rounded-full  bg-[${colors.darkPurple}]`}
              />

              <TouchableOpacity
                onPress={() => setmodalSection('Cancel')}
                style={[
                  tw`flex mt-10 flex-row`,
                  {marginHorizontal: perWidth(30)},
                ]}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: perWidth(4),
                    height: perWidth(12),
                    tintColor: 'black',
                  }}
                  source={images.menu2}
                />
                <View style={[tw``, {marginLeft: perWidth(36)}]}>
                  <Textcomp
                    text={'Cancel Order'}
                    size={14}
                    lineHeight={17}
                    color={'#000000'}
                    fontFamily={'Inter-SemiBold'}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  tw`flex mt-10 flex-row`,
                  {marginHorizontal: perWidth(30), marginTop: perHeight(25)},
                ]}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: perWidth(4),
                    height: perWidth(12),
                    tintColor: 'black',
                  }}
                  source={images.menu2}
                />
                <View style={[tw``, {marginLeft: perWidth(36)}]}>
                  <Textcomp
                    text={'Contact Service Provider'}
                    size={14}
                    lineHeight={17}
                    color={'#000000'}
                    fontFamily={'Inter-SemiBold'}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`flex mt-10 flex-row`,
                  {marginHorizontal: perWidth(30), marginTop: perHeight(25)},
                ]}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: perWidth(4),
                    height: perWidth(12),
                    tintColor: 'black',
                  }}
                  source={images.menu2}
                />
                <View style={[tw``, {marginLeft: perWidth(36)}]}>
                  <Textcomp
                    text={'View Location'}
                    size={14}
                    lineHeight={17}
                    color={'#000000'}
                    fontFamily={'Inter-SemiBold'}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw`flex mt-10 flex-row`,
                  {marginHorizontal: perWidth(30), marginTop: perHeight(25)},
                ]}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: perWidth(4),
                    height: perWidth(12),
                    tintColor: 'black',
                  }}
                  source={images.menu2}
                />
                <View style={[tw``, {marginLeft: perWidth(36)}]}>
                  <Textcomp
                    text={'Order Dispute'}
                    size={14}
                    lineHeight={17}
                    color={'#000000'}
                    fontFamily={'Inter-SemiBold'}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={[
                  tw`bg-black mt-auto mb-4`,
                  {height: 2, width: WIDTH_WINDOW * 0.95},
                ]}
              />
            </View>
          </View>
        )}
        {modalSection === 'Cancel' && (
          <View style={tw` h-full w-full bg-black bg-opacity-5`}>
            <TouchableOpacity
              onPress={() => setInfoModal(false)}
              style={tw`flex-1`}
            />
            <View style={tw`h-[35%]  mt-auto bg-[#D9D9D9]`}>
              <TouchableOpacity
                onPress={() => {
                  setInfoModal(false);
                }}
                style={tw`w-15 h-1 mx-auto rounded-full  bg-[${colors.darkPurple}]`}
              />
              <View style={[tw`mt-6`, {marginLeft: perWidth(36)}]}>
                <Textcomp
                  text={'Cancel Order'}
                  size={16}
                  lineHeight={18.75}
                  color={'#000000'}
                  fontFamily={'Inter-SemiBold'}
                />
              </View>

              <View
                style={[
                  tw``,
                  {marginLeft: perWidth(36), marginTop: perHeight(20)},
                ]}>
                <Textcomp
                  text={
                    'Orders can only be canceled 5 hours before scheduled delivery time'
                  }
                  size={12}
                  lineHeight={16.75}
                  color={'#000000'}
                  fontFamily={'Inter-Regular'}
                />
              </View>

              <TouchableOpacity
                style={[{
                  width: perWidth(316),
                  height: perHeight(40),
                  borderRadius: 13,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colors.darkPurple,
                  marginTop: 40,
                },tw`mx-auto`]}>
                <Textcomp
                  text={'Okay'}
                  size={14}
                  lineHeight={17}
                  color={'#FFC727'}
                  fontFamily={'Inter-SemiBold'}
                />
              </TouchableOpacity>

              <View
                style={[
                  tw`bg-black mt-auto mb-4`,
                  {height: 2, width: WIDTH_WINDOW * 0.95},
                ]}
              />
            </View>
          </View>
        )}
      </Modal>
    </>
  );
};
export default Orderscomponent2;
