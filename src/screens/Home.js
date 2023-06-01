import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { logout } from '../store/reducer/mainSlice';
import Button from '../components/Button';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <Header title={'Home'} />
        <Text>Home screen</Text>
        <Button text={'Log Out'} onClick={() => dispatch(logout())} />

        <Button onClick={() => {
          navigation.navigate('TermAndCondition')
        }}
          style={{marginBottom: 20}}
          text={`Term And Condition`} />
        <Button onClick={() => {
          navigation.navigate('FAQ')
        }}

          text={`FAQ`} />
      </ScrollView>
    </View>
  );
};


export default Home;
