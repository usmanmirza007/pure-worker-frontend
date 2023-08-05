import {Image, View} from 'react-native';
import {perHeight, perWidth} from '../../utils/position/sizes';
import React from 'react';
import images from '../../constants/images';
import tw from 'twrnc';
import Textcomp from '../Textcomp';
import StarRating from 'react-native-star-rating-widget';
import colors from '../../constants/colors';

const ClosetoYou = ({item, index}: any) => (
  <View
    style={[
      tw` mt-4 border-[#FFC727] bg-[${colors.darkPurple}]`,
      {
        height: perWidth(130),
        width: perWidth(200),
        borderWidth: 3,
        borderRadius: 20,
        marginLeft: index === 0 ? 10 : 3,
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
      <View style={[tw``, {marginLeft: perWidth(12)}]}>
        <View style={[tw``, {}]}>
          <Textcomp
            text={'Adams P.'}
            size={12}
            lineHeight={14}
            color={colors.primary}
            fontFamily={'Inter-SemiBold'}
          />
        </View>
        <View style={[tw``, {width: perWidth(105), marginTop: perHeight(4)}]}>
          <Textcomp
            text={'Tile Installation and  Repair djdbndf dhjedbeb whd'}
            size={12}
            lineHeight={14}
            color={colors.white}
            fontFamily={'Inter-SemiBold'}
            numberOfLines={2}
          />
        </View>
        <View style={[tw``, {width: perWidth(105), marginTop: perWidth(4)}]}>
          <Textcomp
            text={'$20/hr'}
            size={12}
            lineHeight={14}
            color={colors.white}
            fontFamily={'Inter-SemiBold'}
          />
        </View>
      </View>
    </View>

    <View
      style={[
        tw`flex flex-row justify-between items-center `,
        {marginTop: perHeight(3)},
      ]}>
      <View style={tw`flex flex-row items-center`}>
        <View style={[tw``, {}]}>
          <Image
            resizeMode="cover"
            style={{
              width: perWidth(26),
              height: perWidth(26),
              borderRadius: perWidth(25) / 2,
            }}
            source={images.location}
          />
        </View>

        <View style={[tw`ml-1`, {width: perWidth(80), marginTop: perWidth(1)}]}>
          <Textcomp
            text={'$20/hr'}
            size={12}
            lineHeight={14}
            color={colors.white}
            fontFamily={'Inter-SemiBold'}
          />
        </View>
      </View>

      <View
        style={[tw`ml-auto`, {width: perWidth(40), marginTop: perWidth(1)}]}>
        <StarRating
          style={{width: perWidth(40)}}
          starStyle={{marginHorizontal: 0}}
          maxStars={5}
          starSize={10}
          rating={4}
          onChange={() => {}}
        />
      </View>
    </View>
  </View>
);
export default ClosetoYou;
