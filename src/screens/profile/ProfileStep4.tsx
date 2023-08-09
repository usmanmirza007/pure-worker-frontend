import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  Image,
  ScrollView, TouchableOpacity
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigation } from '../../constants/navigation';
import Header from '../../components/Header';
import images from '../../constants/images';
import Button from '../../components/Button';
import TextWrapper from '../../components/TextWrapper';
import commonStyle from '../../constants/commonStyle';
import { useCreateServiceMutation, useGetCategoryQuery, useLoginMutation } from '../../store/slice/api';
import colors from '../../constants/colors';
import { useSelector } from 'react-redux';
import ProfileStepWrapper from '../../components/ProfileStepWrapper';
import TextInputs from '../../components/TextInputs';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Snackbar from 'react-native-snackbar';
type Route = {
  key: string
  name: string
  params: {
    serviceId: string
  }
}

const ProfileStep4 = () => {
  const navigation = useNavigation<StackNavigation>();
  const [idNumber, setIdNumber] = useState('');
  const route: Route = useRoute()

  const category = useSelector((state: any) => state.user.category)
  const [collapseState, setCollapseState] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState('');
  const [nationalityItems, setNationalityItems] = useState([
    'Int. Passport',
    'Drivers License',
    'NIN',
    'Voters Card',
    'Others'
  ]);

  const [login] = useLoginMutation();
  const [createService, { isLoading }] = useCreateServiceMutation();


  const handleProfileSetup = () => {
    if (idNumber) {

      const profileData = {
        serviceId: route?.params?.serviceId,
        idNumber: idNumber,
        potfolios: [],
        scheduleDate: null,
        appointmentTime: null,
      }
      createService(profileData).unwrap()
        .then((data: any) => {
          if (data) {
            navigation.navigate('ProfileStep5', { serviceId: route?.params?.serviceId })
          }
        })
        .catch((error: any) => {
          console.log('err', error);
          Snackbar.show({
            text: error.data.message, duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#88087B',
          });
        });
    } else {
      Snackbar.show({
        text: 'Please fill all fields',
        duration: Snackbar.LENGTH_SHORT, textColor: '#fff',
        backgroundColor: '#88087B',
      });
    }
  }

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
                        setSelectedVerification(item)
                      }}
                      style={{ marginTop: 8 }}>
                      <TextWrapper
                        fontType={'semiBold'}
                        style={{
                          color: selectedVerification.includes(item) ? colors.primary : colors.white,
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
          <TextInputs style={{ marginTop: 10, backgroundColor: colors.greyLight1 }} labelText={''} state={idNumber} setState={setIdNumber} />

          {!isLoading ?
            <Button onClick={() => { handleProfileSetup() }}
              style={{ marginHorizontal: 40, marginTop: 140, backgroundColor: colors.lightBlack }}
              textStyle={{ color: colors.primary }}
              text={`Verify`} />
            : <ActivityIndicator style={{ marginTop: 150, }} size={'large'} color={colors.parpal} />}

        </View>
      </ScrollView>
    </View>
  );
};


export default ProfileStep4;
