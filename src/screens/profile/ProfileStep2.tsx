import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TextInput
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
import { useDispatch, useSelector } from 'react-redux';
import { WIDTH_WINDOW, generalStyles } from '../../constants/generalStyles';
import ProfileStepWrapper from '../../components/ProfileStepWrapper';
import TextInputs from '../../components/TextInputs';
import DropDownPicker from 'react-native-dropdown-picker';
import PotfolioWrapper from '../../components/PotfolioWrapper';

const PRofileStep2 = () => {
  const navigation = useNavigation<StackNavigation>();
  const [address, setAddress] = useState('');
  const [isAddService, setIsAddService] = useState(false);

  const category = useSelector((state: any) => state.user.category)
  const [inputValues, setInputValues] = useState([]); // State to store input values
  const [servicePrice, setServicePrice] = useState([]); // State to store input values

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
      setInputValues([...updatedInputValues]);
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
    const updatedInputValues: any = [...inputValues];
    updatedInputValues[index] = { ...updatedInputValues[index], value };
    setInputValues(updatedInputValues);
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
            <TouchableOpacity style={[generalStyles.contentCenter, { width: 145, height: 145, borderRadius: 145, alignSelf: 'center', backgroundColor: colors.greyLight1 }]} >
              <TextWrapper children='Upload Profile Photo' fontType={'semiBold'} style={{ textAlign: 'center', fontSize: 14, color: colors.black }} />
            </TouchableOpacity>
            <View style={{ position: 'absolute', right: 40, top: 10, flexDirection: 'row' }}>
              <Image source={images.edit} resizeMode='contain' style={{ width: 20, height: 20, marginLeft: 20, tintColor: '#000' }} />
              <Image source={images.bin} resizeMode='contain' style={{ width: 20, height: 20, marginLeft: 20, tintColor: '#000' }} />
            </View>
          </View>
          <TextWrapper children='Description' isRequired={true} fontType={'semiBold'} style={{ fontSize: 16, marginTop: 20, color: colors.black }} />

          <View style={{
            height: 130,
            borderRadius: 8,
            backgroundColor: colors.greyLight1,
            marginTop: 13
          }}>
            <TextInputs styleInput={{ color: colors.white, paddingHorizontal: 18, }} style={{ marginTop: 0, backgroundColor: colors.greyLight1 }}
              labelText={'Introduce yourself and enter your profile description.'}
              state={address}
              setState={setAddress}
              multiline={true}
              nbLines={5} />
          </View>
          <TextWrapper children='Service Intro' isRequired={true} fontType={'semiBold'} style={{ fontSize: 16, marginTop: 20, marginBottom: 13, color: colors.black }} />

          {inputValues?.length ? inputValues?.map((item: any, index: any) => {
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
                  placeholderTextColor={'#fff'}
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
                    placeholderTextColor={'#fff'}
                    placeholder='N'
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
                    placeholderTextColor={'#fff'}
                    placeholder='N'
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
                color: '#9E9E9E',
              }}
              // arrowIconStyle={{

              // }}
              placeholderStyle={{
                fontFamily: commonStyle.fontFamily.regular,
                fontSize: 14,
                color: '#9E9E9E',
              }}
              style={{
                backgroundColor: "#F7F5F5",
                borderColor: '#9E9E9E14',
              }}
              listMode='FLATLIST'
              showTickIcon={false}
              textStyle={{
                color: '#9E9E9E'
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
            <PotfolioWrapper />
            <PotfolioWrapper />
            <TextWrapper children='Add a Portfolio' isRequired={false} fontType={'semiBold'} style={{ fontSize: 16, marginBottom: 13, color: colors.black }} />
            <View style={{ backgroundColor: colors.greyLight1, height: 80, borderRadius: 5 }}>
              <Image source={images.cross} resizeMode='contain' style={{ width: 10, height: 10, marginLeft: 20, marginTop: 10, tintColor: '#000' }} />
              <TextWrapper children='Maximum number of portfolios added.' isRequired={false} fontType={'normal'} style={{ textAlign: 'center', fontSize: 12, marginTop: 13, color: colors.black }} />
            </View>
            <Button onClick={() => { navigation.navigate('ProfileStep3') }}
              style={{ marginBottom: 20, marginTop: 20, backgroundColor: colors.lightBlack }}
              textStyle={{ color: colors.primary }}
              text={`Next`} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default PRofileStep2;