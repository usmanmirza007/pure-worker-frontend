import React, { useEffect } from 'react';
import {
  View,
  Text
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
 
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
          <Text>homr</Text>
      </ScrollView>
    </View>
  );
};


export default Home;
