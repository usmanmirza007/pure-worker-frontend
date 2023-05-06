import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import images from '../constants/images';
import Button from '../components/Button';
import commonStyle from '../constants/commonStyle';
import MyStatusBar from '../components/MyStatusBar';
import colors from '../constants/colors';
const { width, height } = Dimensions.get('window');

export default function OnBoarding3() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MyStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#403FFC"
      />
      <ScrollView contentContainerStyle={{ flex: 1 }}>

        <View style={{ alignItems: 'center' }}>

          <Image source={images.pureWorkerLogo} style={{ height: 50, width: 200, marginTop: 40, }} resizeMode='contain' />
          <Image source={images.heroPix2} style={{ height: 242, width: 275, marginTop: 65 }} resizeMode='contain' />
        </View>
        <View style={{ alignItems: 'center', marginTop: 35 }}>
          <Text style={{ width: 265, color: 'white',fontSize:18, fontFamily:'bold'}}>
          Empowering service providers to grow, one job at atime 
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 45 }}>
          <View style={{ height: 2, width: 65, borderRadius: 2, backgroundColor: 'gray' }}></View>
          <View style={{ height: 2, width: 65, marginLeft: 32, borderRadius: 2, backgroundColor: 'gray' }}></View>
          <View style={{ height: 2, width: 65, marginLeft: 32, borderRadius: 2, backgroundColor: 'white' }}></View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30, marginHorizontal: 20, marginTop: 45 }}>
          <Button text={'Login'} textStyle={{ color: '#000', fontSize: 20 }} style={{ flex: 1, borderRadius: 30, height: 45, backgroundColor: colors.primary, }} />
          <Button text={'Register'} textStyle={{ color: '#000', fontSize: 20, fontFamily:'bold' }} style={{ flex: 1, borderRadius: 30, height: 45, backgroundColor: colors.white }} />

        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})
