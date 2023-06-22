import React, { useEffect, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';

import TextWrapper from './TextWrapper';
import images from '../constants/images';
import colors from '../constants/colors';
import { WIDTH_WINDOW, generalStyles } from '../constants/generalStyles';
import TextInputs from './TextInputs';
import Button from './Button';

const PotfolioWrapper = () => {
  const [address, setAddress] = useState('');
  const [isAddService, setIsAddService] = useState(false);

  return (
    <View style={{marginBottom: 20}}>
      <View style={[generalStyles.rowBetween]}>
        {isAddService ? <TextInputs styleInput={{ color: colors.white, paddingHorizontal: 18, }} style={{ width: 160, backgroundColor: colors.greyLight1 }}
          labelText={'Portfolio 1'}
          state={address}
          setState={setAddress} /> :
          <View style={{ paddingHorizontal: 10, justifyContent: 'center', backgroundColor: colors.lightBlack, height: 50, width: 160, borderRadius: 5, }}>
            <TextWrapper
              numberOfLines={1}
              fontType={'semiBold'}
              style={{
                fontSize: 12,
                color: '#fff',
              }}>
              Portfolio 1
            </TextWrapper>
          </View>}
        <View style={[generalStyles.rowCenter]}>
          <TouchableOpacity onPress={() => { setIsAddService(true) }}>

            <Image source={images.edit} resizeMode='contain' style={{ width: 20, height: 20, marginLeft: 20, tintColor: '#000' }} />
          </TouchableOpacity>
          <Image source={images.bin} resizeMode='contain' style={{ width: 20, height: 20, marginHorizontal: 20, tintColor: '#000' }} />
          <Button onClick={() => { setIsAddService(false) }}
            style={{ width: 80, backgroundColor: colors.lightBlack }}
            textStyle={{ color: colors.primary }}
            text={`Done`} />
        </View>
      </View>
    </View>
  );
};
export default PotfolioWrapper;
