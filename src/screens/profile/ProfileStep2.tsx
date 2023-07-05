import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import {
  View,
  Image,
  TextInput,
  Platform
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../constants/navigation';
import Header from '../../components/Header';
import images from '../../constants/images';
import Button from '../../components/Button';
import TextWrapper from '../../components/TextWrapper';
import commonStyle from '../../constants/commonStyle';
import { useCreateServiceMutation, useGetCategoryQuery, useLoginMutation } from '../../store/slice/api';
import colors from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { WIDTH_WINDOW, generalStyles } from '../../constants/generalStyles';
import ProfileStepWrapper from '../../components/ProfileStepWrapper';
import TextInputs from '../../components/TextInputs';
import DropDownPicker from 'react-native-dropdown-picker';
import PotfolioWrapper from '../../components/PotfolioWrapper';
import { launchCamera, launchImageLibrary } from '../../constants/utils';
import * as ImagePicker from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';

const PRofileStep2 = () => {
  const navigation = useNavigation<StackNavigation>();
  const [description, setDescription] = useState('');
  const [PotfolioFirst, setPotfolioFirst] = useState('');
  const [PotfolioSecond, setPotfolioSecond] = useState('');
  const [imageObject, setImageObject] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [potfolioImageObject, setPotfolioImageObject] = useState([]);
  const [potfolioImageUrl, setPotfolioImageUrl] = useState([]);

  const category = useSelector((state: any) => state.user.category)
  const [servicesDescription, setServicesDescription] = useState([]); // State to store input values
  const [servicePrice, setServicePrice] = useState([]); // State to store input values
  const [createService] = useCreateServiceMutation();

  const [nationalityOpen, setNationalityOpen] = useState(false);
  const [nationalityValue, setNationalityValue] = useState(null);
  const [nationalityItems, setNationalityItems] = useState([
    { label: 'New York', value: 'New York' },
    { label: 'Los Angeles', value: 'Los Angeles' },
    { label: 'Chicago', value: 'Chicago' },
    { label: 'Houston', value: 'Houston' },
    { label: 'Phoenix', value: 'Phoenix' },
  ]);

  useEffect(() => {
    if (category.length) {
      const updatedInputValues = category.map((service: string) => ({
        serviceName: service,
        value: ''
      }));
      setServicesDescription([...updatedInputValues]);
    }
  }, [category]);

  useEffect(() => {
    if (category.length) {
      const updatedInputValues = category.map((service: string) => ({
        serviceName: service,
        priceMin: '',
        priceMax: ''
      }));
      setServicePrice([...updatedInputValues]);
    }
  }, [category]);

  const handleInputChange = (index: number, value: string) => {
    const updatedInputValues: any = [...servicesDescription];
    updatedInputValues[index] = { ...updatedInputValues[index], value };
    setServicesDescription(updatedInputValues);
  };
  const handleServicePriceMinChange = (index: number, priceMin: string) => {
    const updatedInputValues: any = [...servicePrice];
    updatedInputValues[index] = { ...updatedInputValues[index], priceMin };
    setServicePrice(updatedInputValues);
  };
  const handleServicePriceMaxChange = (index: number, priceMax: string) => {
    const updatedInputValues: any = [...servicePrice];
    updatedInputValues[index] = { ...updatedInputValues[index], priceMax };
    setServicePrice(updatedInputValues);
  };
  const { data: getCategoryData, isLoading, isError } = useGetCategoryQuery()
  const getCategory = getCategoryData ?? []

  const handleProfileSetup = () => {
    if (imageObject && description && servicesDescription && servicePrice && nationalityValue) {

      const profileData = {
        profilePicture: imageObject,
        description: description,
        servicesDescription: JSON.stringify(servicesDescription),
        servicePrice: JSON.stringify(servicePrice),
        city: nationalityValue,
        portfolioFirst: PotfolioFirst,
        portfolioSecond: PotfolioSecond,
        serviceImageFirst: potfolioImageObject.length ? potfolioImageObject[0] : '',
        serviceImageSecond: potfolioImageObject.length > 1 ? potfolioImageObject[1] : '',
        serviceImageThird: potfolioImageObject.length > 2 ? potfolioImageObject[2] : '',
        serviceId: '',
      }
      createService(profileData).unwrap()
        .then((data: any) => {
          if (data) {
            navigation.navigate('ProfileStep3', { serviceId: data.serviceId, })
          }
        })
        .catch((error: any) => {
          console.log('err', error);
          Snackbar.show({
            text: JSON.stringify(error), duration: Snackbar.LENGTH_SHORT, textColor: '#fff', backgroundColor: '#88087B',
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
        <ProfileStepWrapper active={'two'} />
        <View style={{ marginHorizontal: 20 }}>
          <TextWrapper children='Add Services' fontType={'semiBold'} style={{ fontSize: 20, marginTop: 30, color: colors.black }} />
          <TextWrapper children='What services do you provide?' fontType={'semiBold'} style={{ fontSize: 16, marginTop: 13, color: colors.black }} />
          <TextWrapper children='Profile' fontType={'semiBold'} style={{ fontSize: 20, marginTop: 30, color: colors.black }} />

          <View>
            <View style={[generalStyles.contentCenter, { width: 145, height: 145, borderRadius: 145, alignSelf: 'center', backgroundColor: colors.greyLight1 }]} >
              {!imageUrl ? <TextWrapper children='Upload Profile Photo' fontType={'semiBold'} style={{ textAlign: 'center', fontSize: 14, color: colors.black }} />
                : <Image source={{ uri: imageUrl }} style={{ width: 145, height: 145, borderRadius: 145 }} />}

            </View>
            <View style={{ position: 'absolute', right: 40, top: 10, flexDirection: 'row' }}>
              <TouchableOpacity onPress={async () => {
                const response = await launchImageLibrary()
                if (response) {
                  setImageObject(response)
                  setImageUrl(response?.uri ? response.uri : '')
                }
              }}>
                <Image source={images.edit} resizeMode='contain' style={{ width: 20, height: 20, marginLeft: 20, tintColor: '#000' }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setImageUrl('')}>
                <Image source={images.bin} resizeMode='contain' style={{ width: 20, height: 20, marginLeft: 20, tintColor: '#000' }} />
              </TouchableOpacity>
            </View>
          </View>
          <TextWrapper children='Description' isRequired={true} fontType={'semiBold'} style={{ fontSize: 16, marginTop: 20, color: colors.black }} />

          <View style={{
            height: 130,
            borderRadius: 8,
            backgroundColor: colors.greyLight1,
            marginTop: 13
          }}>
            <TextInputs styleInput={{ color: colors.black, paddingHorizontal: 18, fontSize: 12 }} style={{ backgroundColor: colors.greyLight1 }}
              labelText={'Introduce yourself and enter your profile description.'}
              state={description}
              setState={setDescription}
              multiline={true}
              nbLines={5} />
          </View>

          <TextWrapper children='Service Intro' isRequired={true} fontType={'semiBold'} style={{ fontSize: 16, marginTop: 20, marginBottom: 13, color: colors.black }} />

          {servicesDescription?.length ? servicesDescription?.map((item: any, index: any) => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH_WINDOW - 40, justifyContent: 'space-between', marginBottom: 13 }}>
                <View key={index} style={{ paddingHorizontal: 10, justifyContent: 'center', backgroundColor: colors.lightBlack, height: 50, width: 120, borderRadius: 5, }}>
                  <TextWrapper
                    numberOfLines={1}
                    fontType={'semiBold'}
                    style={{
                      fontSize: 12,
                      color: '#fff',
                    }}>
                    {item?.serviceName}
                  </TextWrapper>
                </View>
                <TextInput
                  style={{ width: '60%', paddingHorizontal: 10, backgroundColor: colors.lightBlack, borderRadius: 5, color: '#fff' }}
                  placeholderTextColor={colors.grey}
                  placeholder='Type name of service'
                  key={index}
                  value={item.value} // Assign value from state
                  onChangeText={value => handleInputChange(index, value)}
                />
              </View>
            )
          }) : null}

          <TextWrapper children='Price Range' isRequired={true} fontType={'semiBold'} style={{ fontSize: 16, marginTop: 20, marginBottom: 13, color: colors.black }} />

          {servicePrice?.length ? servicePrice?.map((item: any, index: any) => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center', width: WIDTH_WINDOW - 40, justifyContent: 'space-between', marginBottom: 13 }}>
                <View key={index} style={{ paddingHorizontal: 10, justifyContent: 'center', backgroundColor: colors.lightBlack, height: 50, width: 120, borderRadius: 5, }}>
                  <TextWrapper
                    numberOfLines={1}
                    fontType={'semiBold'}
                    style={{
                      fontSize: 12,
                      color: '#fff',
                    }}>
                    {item?.serviceName}
                  </TextWrapper>
                </View>

                <View style={[generalStyles.rowCenter]}>
                  <TextInput
                    style={{ width: 80, paddingHorizontal: 10, backgroundColor: colors.lightBlack, borderRadius: 5, color: '#fff' }}
                    placeholderTextColor={colors.grey}
                    placeholder='N'
                    keyboardType='number-pad'
                    key={index}
                    value={item.value} // Assign value from state
                    onChangeText={value => handleServicePriceMinChange(index, value)}
                  />
                  <TextWrapper
                    fontType={'semiBold'}
                    style={{
                      fontSize: 12,
                      color: colors.black,
                      marginHorizontal: 10
                    }}>
                    to
                  </TextWrapper>
                  <TextInput
                    style={{ width: 80, paddingHorizontal: 10, backgroundColor: colors.lightBlack, borderRadius: 5, color: '#fff' }}
                    placeholderTextColor={colors.grey}
                    placeholder='N'
                    keyboardType='number-pad'
                    key={index}
                    value={item.value} // Assign value from state
                    onChangeText={value => handleServicePriceMaxChange(index, value)}
                  />
                </View>
              </View>
            )
          }) : null}
          <View style={{
            minHeight: 500,
            marginBottom: -400,
            zIndex: 1
          }}>

            <TextWrapper children='What City do you offer your Services?' isRequired={true} fontType={'semiBold'} style={{ fontSize: 16, marginTop: 20, marginBottom: 13, color: colors.black }} />
            <DropDownPicker
              open={nationalityOpen}
              value={nationalityValue}
              items={nationalityItems}
              setOpen={setNationalityOpen}
              setValue={setNationalityValue}
              setItems={setNationalityItems}
              showArrowIcon={false}
              zIndex={10}
              dropDownContainerStyle={{
                borderWidth: 0,
              }}
              labelStyle={{
                fontFamily: commonStyle.fontFamily.regular,
                fontSize: 14,
                color: colors.white,
              }}
              arrowIconStyle={{
                // backgroundColor: 'red'

              }}
              placeholderStyle={{
                fontFamily: commonStyle.fontFamily.regular,
                fontSize: 14,
                color: '#9E9E9E',
              }}
              style={{
                backgroundColor: colors.lightBlack,
                borderColor: colors.primary,
                borderWidth: 2
              }}
              listMode='FLATLIST'
              showTickIcon={false}
              textStyle={{
                color: colors.white
              }}
              listParentLabelStyle={{
                color: '#000',
                fontSize: 16,
                fontFamily: commonStyle.fontFamily.regular
              }}

              listItemContainerStyle={{
                backgroundColor: '#F1F1F1',
                borderColor: 'red',
                opacity: 1,
                borderWidth: 0
              }}
            />
          </View>
          <View style={{ zIndex: nationalityOpen ? 0 : 2, }}>
            <TextWrapper children='Portfolio' isRequired={false} fontType={'semiBold'} style={{ fontSize: 16, marginTop: 20, marginBottom: 13, color: colors.black }} />
            <PotfolioWrapper setPotfolio={setPotfolioFirst} />
            <PotfolioWrapper setPotfolio={setPotfolioSecond} />
            <TextWrapper children='Add a Portfolio' isRequired={false} fontType={'semiBold'} style={{ fontSize: 16, marginBottom: 13, color: colors.black }} />
            {potfolioImageUrl.length == 3 && <View style={{ backgroundColor: colors.greyLight1, height: 80, borderRadius: 5 }}>
              <Image source={images.cross} resizeMode='contain' style={{ width: 10, height: 10, marginLeft: 20, marginTop: 10, tintColor: '#000' }} />
              <TextWrapper children='Maximum number of portfolios added.' isRequired={false} fontType={'normal'} style={{ textAlign: 'center', fontSize: 12, marginTop: 13, color: colors.black }} />
            </View>}
            {potfolioImageUrl.length < 3 && <TouchableOpacity
              onPress={async () => {
                const response = await launchImageLibrary()
                if (response) {
                  setPotfolioImageObject([...potfolioImageObject, response])
                  setPotfolioImageUrl([...potfolioImageUrl, response?.uri])
                }
              }}
              style={[generalStyles.contentCenter, { height: 25, width: 120, borderRadius: 5, marginTop: 13, backgroundColor: colors.lightBlack }]}>
              <TextWrapper children='Upload Images' isRequired={false} fontType={'semiBold'} style={{ textAlign: 'center', fontSize: 12, color: colors.white }} />
            </TouchableOpacity>}
            <View style={[generalStyles.rowCenter, { marginRight: 20, }]}>
              {potfolioImageUrl.map((item, index) => {
                return (
                  <View key={index} style={[[generalStyles.rowCenter, { marginRight: 20 }], { marginTop: 10, }]}>
                    <TextWrapper children={item?.slice(-8)} isRequired={false} fontType={'semiBold'} style={{ textAlign: 'center', fontSize: 12, color: colors.black }} />
                    <TouchableOpacity onPress={() => {
                      setPotfolioImageObject(potfolioImageObject.filter((text) => text?.uri !== item))
                      setPotfolioImageUrl(potfolioImageUrl.filter((text) => text !== item))
                    }}>
                      <Image source={images.cross} resizeMode='contain' style={{ width: 10, height: 10, marginLeft: 20, tintColor: '#000' }} />
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
            <Button onClick={() => {
              handleProfileSetup()
            }}
              style={{ marginBottom: 20, marginTop: 20, marginHorizontal: 40, backgroundColor: colors.lightBlack }}
              textStyle={{ color: colors.primary }}
              text={`Next`} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default PRofileStep2;
