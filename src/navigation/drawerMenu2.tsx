import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import HomeScreen from '../screens/vendor/Home';
import TabIcon from '../components/TabIcon';
import images from '../constants/images';
import {SIZES, perHeight} from '../utils/position/sizes';
import {Platform} from 'react-native';
import DrawerContent from './drawerContent';
import Wallet from '../screens/vendor/Wallet';
import Orders from '../screens/vendor/Orders';
import Support from '../screens/vendor/support';
import Account from '../screens/vendor/account';
import PrivacyPolicy from '../screens/vendor/privacy-policy';
import DeactivateAccount from '../screens/vendor/deactivateAccount';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#00041380',
        tabBarLabelStyle: {
          fontWeight: '600',
          fontFamily: 'Inter-Regular',
        },
        tabBarStyle: {
          backgroundColor: '#F6F6F6',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          width: SIZES.width,
          height: Platform.OS === 'ios' ? perHeight(70) : perHeight(80),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={images.home} name={'Home'} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={images.orders} name={'Orders'} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={images.chat} name={'Chats'} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={images.notification}
              name={'Notifications'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerMenu = () => {
  return (
    <PaperProvider>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Wallet"
          component={Wallet}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Support"
          component={Support}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Account"
          component={Account}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="DeactivateAccount"
          component={DeactivateAccount}
          options={{headerShown: false}}
        />
        {/* Add other drawer screens as needed */}
      </Drawer.Navigator>
    </PaperProvider>
  );
};

export default DrawerMenu;
