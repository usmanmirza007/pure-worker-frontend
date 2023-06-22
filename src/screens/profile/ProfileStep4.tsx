import React, { useState } from 'react';
import {
  View,
  Image,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../constants/navigation';
import Header from '../../components/Header';
import images from '../../constants/images';
import Button from '../../components/Button';
import TextWrapper from '../../components/TextWrapper';
import commonStyle from '../../constants/commonStyle';
import { useGetCategoryQuery } from '../../store/slice/api';
import colors from '../../constants/colors';
import { useSelector } from 'react-redux';
import ProfileStepWrapper from '../../components/ProfileStepWrapper';
import TextInputs from '../../components/TextInputs';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
const ProfileStep4 = () => {
  const navigation = useNavigation<StackNavigation>();
  const [address, setAddress] = useState('');

  const category = useSelector((state: any) => state.user.category)
  const [collapseState, setCollapseState] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [nationalityItems, setNationalityItems] = useState([
    'Int. Passport',
    'Drivers License',
    'NIN',
    'Voters Card',
    'Others'
  ]);
  return (
    <View style={[{ flex: 1, backgroundColor: colors.greyLight },]}>
      <ScrollView>
        <Header style={{ backgroundColor: colors.greyLight }} imageStyle={{ tintColor: colors.black }} textStyle={{ color: colors.black, fontFamily: commonStyle.fontFamily.semibold }} title={'Complete your Registration'} image={images.back} />
        <ProfileStepWrapper active={'four'} />
        <View style={{ marginHorizontal: 20 }}>
          <TextWrapper children='Identity Verification' fontType={'semiBold'} style={{ fontSize: 20, marginTop: 30, color: colors.black }} />
          <Collapse
            onToggle={() => {
              if (!dataLoaded) {
                setDataLoaded(true);
              }
              setCollapseState(!collapseState);
            }}
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <CollapseHeader
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: colors.lightBlack,
                marginVertical: 10,
                borderRadius: 5,
                height: 35,
                width: '95%',
                borderColor: colors.primary,
                borderWidth: 2,
                paddingHorizontal: 15,
                // marginHorizontal: 20
              }}>
              <View style={{}}>
                <TextWrapper
                  fontType={'semiBold'}
                  style={{
                    fontSize: 14,
                    color: '#fff',
                  }}>
                  Select a valid means of ID
                </TextWrapper>
              </View>
              {collapseState ? (
                <Image
                  source={images.polygonDown}
                  resizeMode={'contain'}
                  style={{ width: 15, height: 15 }}
                />
              ) : (
                <Image
                  source={images.polygonForward}
                  resizeMode={'contain'}
                  style={{ width: 15, height: 15 }}
                />
              )}
              <TextWrapper
                fontType={'semiBold'}
                style={{
                  fontSize: 35,
                  color: '#D20713',
                  position: 'absolute', right: -25,
                }}>
                {'*'}
              </TextWrapper>
            </CollapseHeader>
            <CollapseBody>
              {nationalityItems && <View style={{
                borderColor: colors.primary,
                backgroundColor: colors.lightBlack,
                borderWidth: 2,
                flexDirection: 'row', flexWrap: 'wrap',
                width: '95%',
              }}>
                {nationalityItems.map((item: any, index: number) => {
                  var offerStyle;
                  if (index > 0) {
                    offerStyle = { marginBottom: 25 };
                  }
                  return (
                    <TouchableOpacity
                      onPress={() => {
                      }}
                      style={{ marginTop: 8 }}>
                      <TextWrapper
                        fontType={'semiBold'}
                        style={{
                          color: category.includes(item) ? colors.primary : colors.white,
                          marginLeft: 11,
                          marginRight: 8,
                          marginBottom: 8,
                        }}>
                        {item}
                      </TextWrapper>
                    </TouchableOpacity>
                  );
                })}
              </View>}
            </CollapseBody>
          </Collapse>
          <TextWrapper children='Enter ID Number' isRequired={true} fontType={'semiBold'} style={{ fontSize: 13, marginTop: 13, color: colors.black }} />
          <TextInputs style={{ marginTop: 10, backgroundColor: colors.greyLight1 }} labelText={''} state={address} setState={setAddress} />

          <Button onClick={() => { navigation.navigate('ProfileStep5') }}
            style={{ marginHorizontal: 40, marginTop: 140, backgroundColor: colors.lightBlack }}
            textStyle={{ color: colors.primary }}
            text={`Verify`} />
        </View>
      </ScrollView>
    </View>
  );
};


export default ProfileStep4;