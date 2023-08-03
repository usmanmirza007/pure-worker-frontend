import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home from '../screens/Home';
import Home from '../screens/user/Home';
import TermAndCondition from '../screens/TermAndCondition';
import FAQ from '../screens/FAQ';
import ProfileStep1 from '../screens/profile/ProfileStep1';
import PRofileStep2 from '../screens/profile/ProfileStep2';
import ProfileStep3 from '../screens/profile/ProfileStep3';
import ProfileStep4 from '../screens/profile/ProfileStep4';
import ProfileStep5 from '../screens/profile/ProfileStep5';
import DrawerMenu from './drawerMenu2';

const Stack = createNativeStackNavigator();

export default function VendorNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homes"
        component={DrawerMenu}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="TermAndCondition"
        component={TermAndCondition}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="ProfileStep1"
        component={ProfileStep1}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="ProfileStep2"
        component={PRofileStep2}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="ProfileStep3"
        component={ProfileStep3}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="ProfileStep4"
        component={ProfileStep4}
        options={{headerShown: false, animationEnabled: false}}
      />
      <Stack.Screen
        name="ProfileStep5"
        component={ProfileStep5}
        options={{headerShown: false, animationEnabled: false}}
      />
    </Stack.Navigator>
  );
}
