import * as ImagePicker from 'react-native-image-picker';

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


// async function storagePermission() {
//   const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
//   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       // if get here, the user has accepted the permissions
//       launchImageLibrary()
//   } else {
//       // if get here, the user did NOT accepted the permissions
//   }
// }

export const launchImageLibrary = async () => {
  const options = {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  };
  try {
    const response = await ImagePicker.launchImageLibrary(options)
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response?.error) {
      console.log('ImagePicker Error: ', response?.error);
    } else {
      if (response.assets && response.assets.length) {
        return response.assets[0]
      }
    }
  } catch (error) {
    console.log('er', error);
  }
};

export const launchCamera = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  let imageObject = null
  ImagePicker.launchCamera(options, (response: any) => {

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      console.log('response.assets[0]', response.assets[0]);

      imageObject = response.assets[0]
    }
  });
  if (imageObject) {
    return imageObject
  }

}
