import 'react-native-gesture-handler'
import React, { useState, useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';
import Snackbar from 'react-native-snackbar';
import { store, persistor } from './src/store/store';
import SplashScreen from 'react-native-splash-screen';

// onboarding 
import Login from './src/screens/Login';
import Welcome from './src/screens/welcome';
import OnBoarding1 from './src/screens/OnBoarding1';
import OnBoarding2 from './src/screens/OnBoarding2';
import OnBoarding3 from './src/screens/OnBoarding3';

// home 
import Home from './src/screens/Home';
import { Provider, useSelector } from 'react-redux';
import { navigationRef } from './RootNavigation';
import Signup from './src/screens/Signup';
import VenderSignup from './src/screens/VenderSignup';
import auth from '@react-native-firebase/auth';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginNumberFunc from './src/screens/LoginNumberFunc';
import TokenVerification from './src/screens/TokenVerification';

const Stack = createStackNavigator();
const { width } = Dimensions.get('screen');

export default () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  // async function onAuthStateChanged(user) {
  //   setUser(user);
  //   console.log('fofof', user);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  
  // useEffect(() => {
  //   const handleDynamicLink = async (link) => {
  //     // Check and handle if the link is a email login link
  //     console.log('link', link);
  //     if (auth().isSignInWithEmailLink(link.url)) {

  //       try {
  //         // use the email we saved earlier
  //         const email = await AsyncStorage.getItem('emailForSignIn');
  //         // store.dispatch(startLoginLoading())

  //         const checkLink = await auth().signInWithEmailLink(email, link.url);
  //         const uid = auth().currentUser?.uid
  //         const userEmail = auth().currentUser?.email
  //         if (uid && userEmail) {
  //           // store.dispatch(createUser())
  //           // create user in database sql
  //         }
  //         // handleState()

  //         /* You can now navigate to your initial authenticated screen
  //           You can also parse the `link.url` and use the `continueurl` param to go to another screen
  //           The `continueurl` would be the `url` passed to the action code settings */
  //       }
  //       catch (e) {
  //         console.log('err', e);
  //         Snackbar.show({
  //           text: 'Expired link',
  //           duration: Snackbar.LENGTH_SHORT,
  //         });
  //         // store.dispatch(createUserSuccess())
  //       }
  //     }
  //   };

  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

  //   /* When the app is not running and is launched by a magic link the `onLink`
  //      method won't fire, we can handle the app being launched by a magic link like this */
  //   dynamicLinks().getInitialLink()
  //     .then(link => link && handleDynamicLink(link));

  //   // When the component is unmounted, remove the listener
  //   return () => unsubscribe();
  // }, []);

  // function AppStack() {
  //   return (
  //     <>
  //       <Drawer.Navigator
          
  //         style={{ flex: 1 }}
  //         drawerContent={(props) => <CustomDrawerContent {...props} />}
  //         drawerStyle={{
  //           backgroundColor: 'white',
  //           width: width * 0.8,
            
  //         }}
  //         screenOptions={{
  //           activeTintcolor: 'white',
  //           inactiveTintColor: '#000',
  //           activeBackgroundColor: 'transparent',
  //           itemStyle: {
  //             width: width * 0.75,
  //             backgroundColor: 'transparent',
  //             paddingVertical: 16,
  //             paddingHorizonal: 12,
  //             justifyContent: 'center',
  //             alignContent: 'center',
  //             alignItems: 'center',
  //             overflow: 'hidden',
  //           },
  //           labelStyle: {
  //             fontSize: 18,
  //             marginLeft: 12,
  //             fontWeight: 'normal',
  //           },
  //         }}
  //         initialRouteName="Home"
          
  //       >
  //         <Drawer.Screen name="Home" component={Home}  options={{ headerShown: false }} />
  //         <Drawer.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
  //         <Drawer.Screen name="PastOrders" component={PastOrders} options={{ headerShown: false }} />

  //         <Stack.Screen name="OrderDetails" component={OrderDetails} options={{manimationEnabled: false, headerShown: false}} />
  //         <Stack.Screen name="AddOrder" component={AddOrder} options={{manimationEnabled: false, headerShown: false}} />
  //         <Stack.Screen name="EditOrder" component={EditOrder} options={{manimationEnabled: false, headerShown: false}} />
  //         <Stack.Screen name="Checkout" component={Checkout} options={{manimationEnabled: false, headerShown: false}} />
  //         <Stack.Screen name="CompleteOrder" component={CompleteOrder} options={{manimationEnabled: false, headerShown: false}} />
  //         <Drawer.Screen name="DeliveryStatus" component={DeliveryStatus} options={{manimationEnabled: false, headerShown: false}} />
  //         <Stack.Screen name="Message" component={Message} options={{manimationEnabled: false, headerShown: false}} />
  //         <Stack.Screen name="MessageList" component={MessagesList} options={{manimationEnabled: false, headerShown: false}} />
  //       </Drawer.Navigator>

  //     </>
  //   );
  // }

  function CustomerStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Homes" component={Home} options={{headerShown: false, manimationEnabled: false}} />
      </Stack.Navigator>
    )
  }

  function VenderStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Homes" component={Home} options={{headerShown: false, animationEnabled: false }} />
      </Stack.Navigator>
    )
  }

  function HomeStack() {
    const userType = useSelector(state => state.user.isLoggedIn)
    console.log('user ', userType);
    if (userType) {
      return <CustomerStack />
    } else {
      return <VenderStack />
    } 
  }

  function OnboardingStack() {
    return (
      <Stack.Navigator initialRouteName="Login" >
        {/* <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false, animationEnabled: false, headerShown: false }}/> */}
        {/* <Stack.Screen name="LoginNumberFunc" component={LoginNumberFunc} options={{headerShown: false, animationEnabled: false, headerShown: false }}/> */}
        <Stack.Screen name="Login" component={Login} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="VenderSignup" component={VenderSignup} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="OnBoarding1" component={OnBoarding1} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="OnBoarding2" component={OnBoarding2} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="OnBoarding3" component={OnBoarding3} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
        <Stack.Screen name="TokenVerification" component={TokenVerification} options={{headerShown: false, animationEnabled: false, headerShown: false }}/>
      </Stack.Navigator>
    )
  }

  const MainStack = () => {

    const loggedIn = useSelector(state => state.user.isLoggedIn)

    if (loggedIn && loggedIn.token) {
      return <HomeStack />
    } else {
      return <OnboardingStack />
    }

  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

