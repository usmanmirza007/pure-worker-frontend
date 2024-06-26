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

export const allCountry =  [{label: "Nigeria", value: "Nigeria"}, {label: "Bangladesh", value: "Bangladesh"}, {label: "Belgium", value: "Belgium"}, {label: "Burkina Faso", value: "Burkina Faso"}, {label: "Bulgaria", value: "Bulgaria"}, {label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina"}, {label: "Barbados", value: "Barbados"}, {label: "Wallis and Futuna", value: "Wallis and Futuna"}, {label: "Saint Barthelemy", value: "Saint Barthelemy"}, {label: "Bermuda", value: "Bermuda"}, {label: "Brunei", value: "Brunei"}, {label: "Bolivia", value: "Bolivia"}, {label: "Bahrain", value: "Bahrain"}, {label: "Burundi", value: 
"Burundi"}, {label: "Benin", value: "Benin"}, {label: "Bhutan", value: "Bhutan"}, {label: "Jamaica", value: "Jamaica"}, {label: "Bouvet Island", value: "Bouvet Island"}, {label: "Botswana", value: "Botswana"}, {label: "Samoa", value: "Samoa"}, {label: "Bonaire, Saint Eustatius and Saba ", value: "Bonaire, Saint Eustatius and Saba "}, {label: "Brazil", value: "Brazil"}, {label: "Bahamas", value: "Bahamas"}, {label: "Jersey", value: "Jersey"}, {label: "Belarus", value: "Belarus"}, {label: "Belize", value: "Belize"}, {label: "Russia", value: "Russia"}, {label: "Rwanda", value: "Rwanda"}, {label: "Serbia", value: "Serbia"}, {label: "Timor-Leste", value: "Timor-Leste"}, {label: "Réunion", value: "Réunion"}, {label: "Turkmenistan", value: "Turkmenistan"}, {label: "Tajikistan", value: "Tajikistan"}, {label: "Romania", value: "Romania"}, {label: "Tokelau", value: "Tokelau"}, {label: "Guinea-Bissau", value: "Guinea-Bissau"}, {label: "Guam", value: "Guam"}, {label: "Guatemala", value: "Guatemala"}, {label: "South Georgia and the South Sandwich Islands", value: "South Georgia and the South Sandwich Islands"}, {label: "Greece", value: "Greece"}, {label: "Equatorial Guinea", value: "Equatorial Guinea"}, {label: "Guadeloupe", value: "Guadeloupe"}, {label: "Japan", value: "Japan"}, {label: "Guyana", value: "Guyana"}, {label: "Guernsey", value: "Guernsey"}, {label: "Georgia", value: "Georgia"}, {label: "Grenada", value: "Grenada"}, {label: "United Kingdom", value: "United Kingdom"}, {label: "Gabon", value: "Gabon"}, {label: "El Salvador", value: "El Salvador"}, {label: "Guinea", value: "Guinea"}, {label: "Gambia", value: "Gambia"}, {label: "Greenland", value: "Greenland"}, {label: "Gibraltar", value: "Gibraltar"}, {label: "Ghana", value: "Ghana"}, {label: "Oman", value: "Oman"}, {label: "Tunisia", value: "Tunisia"}, {label: "Jordan", value: "Jordan"}, {label: "Croatia", value: "Croatia"}, {label: "Haiti", value: "Haiti"}, {label: "Hungary", value: "Hungary"}, {label: "Hong Kong", value: "Hong Kong"}, {label: "Honduras", value: "Honduras"}, {label: "Heard Island and McDonald Islands", value: "Heard Island and McDonald Islands"}, {label: "Venezuela", value: "Venezuela"}, {label: "Vatican City State (Holy See)", value: "Vatican City State (Holy See)"}, {label: "Puerto Rico", value: "Puerto Rico"}, {label: "Palestinian Territory", value: "Palestinian Territory"}, {label: "Palau", value: "Palau"}, {label: "Portugal", value: "Portugal"}, {label: "Svalbard and Jan Mayen", value: "Svalbard and Jan Mayen"}, {label: "Paraguay", value: "Paraguay"}, {label: "Iraq", value: "Iraq"}, {label: "Panama", value: "Panama"}, {label: "French Polynesia", value: "French Polynesia"}, {label: "Papua New Guinea", value: "Papua New Guinea"}, {label: "Peru", value: "Peru"}, {label: "Pakistan", value: "Pakistan"}, {label: "Philippines", value: "Philippines"}, {label: "Pitcairn", value: "Pitcairn"}, {label: "Poland", value: "Poland"}, {label: "Saint Pierre and Miquelon", value: "Saint Pierre and Miquelon"}, {label: "Zambia", value: "Zambia"}, {label: "Western Sahara", value: "Western Sahara"}, {label: "Estonia", value: "Estonia"}, {label: "Egypt", value: "Egypt"}, {label: "Cocos (Keeling) Islands", value: "Cocos (Keeling) Islands"}, {label: "South Africa", value: "South Africa"}, {label: "Ecuador", value: "Ecuador"}, {label: "Italy", value: "Italy"}, {label: "Vietnam", value: "Vietnam"}, {label: "Solomon Islands", value: "Solomon Islands"}, {label: "Ethiopia", value: "Ethiopia"}, {label: "Somalia", value: "Somalia"}, {label: "Zimbabwe", value: "Zimbabwe"}, {label: "Saudi Arabia", value: "Saudi Arabia"}, {label: "Spain", value: "Spain"}, {label: "Eritrea", value: "Eritrea"}, {label: "Montenegro", value: "Montenegro"}, {label: "Moldova", value: "Moldova"}, {label: "Madagascar", value: "Madagascar"}, {label: "Saint Martin", value: "Saint Martin"}, {label: "Morocco", value: "Morocco"}, {label: "Monaco", value: "Monaco"}, {label: "Uzbekistan", value: "Uzbekistan"}, {label: "Myanmar", value: "Myanmar"}, {label: "Mali", value: "Mali"}, {label: "Macau", value: "Macau"}, {label: "Mongolia", value: "Mongolia"}, {label: "Marshall Islands", value: "Marshall Islands"}, 
{label: "Macedonia", value: "Macedonia"}, {label: "Mauritius", value: "Mauritius"}, {label: "Malta", value: "Malta"}, {label: "Malawi", value: "Malawi"}, {label: "Maldives", value: "Maldives"}, {label: "Martinique", value: "Martinique"}, {label: "Northern Mariana Islands", value: "Northern Mariana Islands"}, {label: "Montserrat", value: "Montserrat"}, {label: "Mauritania", value: "Mauritania"}, {label: "Isle of Man", value: "Isle of Man"}, {label: "Uganda", value: "Uganda"}, {label: "Tanzania", value: "Tanzania"}, {label: "Malaysia", value: "Malaysia"}, {label: "Mexico", value: "Mexico"}, {label: "Israel", value: "Israel"}, {label: "France", value: "France"}, {label: "British Indian Ocean Territory", value: "British Indian Ocean Territory"}, {label: "Saint Helena", value: "Saint Helena"}, {label: "Finland", value: "Finland"}, {label: "Fiji", value: "Fiji"}, {label: "Falkland Islands", value: "Falkland Islands"}, {label: "Micronesia", value: "Micronesia"}, {label: "Faroe Islands", value: "Faroe Islands"}, {label: "Nicaragua", value: "Nicaragua"}, {label: "Netherlands", value: "Netherlands"}, {label: "Norway", value: "Norway"}, {label: "Namibia", value: "Namibia"}, {label: "Vanuatu", value: "Vanuatu"}, {label: "New Caledonia", value: "New Caledonia"}, {label: "Niger", value: "Niger"}, {label: "Norfolk Island", value: "Norfolk Island"}, {label: "New Zealand", value: "New Zealand"}, {label: "Nepal", value: "Nepal"}, {label: "Nauru", value: "Nauru"}, {label: "Niue", value: "Niue"}, {label: "Cook Islands", value: "Cook Islands"}, {label: "Kosovo", value: "Kosovo"}, {label: "Ivory Coast", value: "Ivory Coast"}, {label: "Switzerland", value: "Switzerland"}, {label: "Colombia", value: "Colombia"}, {label: "China", value: "China"}, {label: "Cameroon", value: "Cameroon"}, {label: "Chile", value: "Chile"}, {label: "Cocos Islands", value: "Cocos Islands"}, {label: "Canada", value: "Canada"}, {label: "Congo", value: "Congo"}, {label: "Central African Republic", value: "Central African Republic"}, {label: "Democratic Republic of the Congo", value: "Democratic Republic of the Congo"}, {label: "Czech Republic", value: "Czech Republic"}, {label: "Cyprus", value: "Cyprus"}, {label: "Christmas Island", value: "Christmas Island"}, {label: "Costa Rica", value: "Costa Rica"}, {label: "Curacao", value: "Curacao"}, {label: "Cape Verde", value: "Cape Verde"}, {label: "Cuba", value: "Cuba"}, {label: "Swaziland", value: "Swaziland"}, {label: "Syria", value: "Syria"}, {label: "Sint Maarten", value: "Sint Maarten"}, {label: "Kyrgyzstan", value: "Kyrgyzstan"}, {label: "Kenya", value: "Kenya"}, {label: "South Sudan", value: "South Sudan"}, {label: "Suriname", value: "Suriname"}, {label: "Kiribati", value: "Kiribati"}, {label: "Cambodia", value: "Cambodia"}, {label: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis"}, {label: "Comoros", value: "Comoros"}, {label: "Sao Tome and Principe", value: "Sao Tome and Principe"}, {label: "Slovakia", value: "Slovakia"}, {label: "South Korea", value: "South Korea"}, {label: "Slovenia", value: "Slovenia"}, {label: "North Korea", value: "North Korea"}, {label: "Kuwait", value: "Kuwait"}, {label: "Senegal", value: "Senegal"}, {label: "San Marino", value: "San Marino"}, {label: "Sierra Leone", value: "Sierra Leone"}, {label: "Seychelles", value: "Seychelles"}, {label: "Kazakhstan", value: "Kazakhstan"}, {label: "Cayman Islands", value: "Cayman Islands"}, {label: "Singapore", value: 
"Singapore"}, {label: "Sweden", value: "Sweden"}, {label: "Sudan", value: "Sudan"}, {label: "Dominican Republic", value: "Dominican Republic"}, {label: "Dominica", value: "Dominica"}, {label: "Djibouti", value: "Djibouti"}, {label: 
"Denmark", value: "Denmark"}, {label: "British Virgin Islands", value: "British Virgin Islands"}, {label: "Germany", value: "Germany"}, {label: "Yemen", value: "Yemen"}, {label: "Algeria", value: "Algeria"}, {label: "United States", value: "United States"}, {label: "Uruguay", value: "Uruguay"}, {label: "Mayotte", value: "Mayotte"}, {label: "United States Minor Outlying Islands", value: "United States Minor Outlying Islands"}, {label: "Lebanon", value: "Lebanon"}, {label: "Saint Lucia", value: "Saint Lucia"}, {label: "Laos", value: "Laos"}, {label: "Tuvalu", value: "Tuvalu"}, {label: "Taiwan", value: "Taiwan"}, {label: "Trinidad and Tobago", value: "Trinidad and Tobago"}, {label: "Turkey", value: "Turkey"}, {label: "Sri Lanka", value: "Sri Lanka"}, {label: "Liechtenstein", value: "Liechtenstein"}, {label: "Latvia", value: "Latvia"}, {label: "Tonga", value: "Tonga"}, {label: "Lithuania", value: "Lithuania"}, {label: "Luxembourg", value: "Luxembourg"}, {label: "Liberia", value: "Liberia"}, {label: "Lesotho", value: "Lesotho"}, {label: "Thailand", value: "Thailand"}, {label: "French Southern Territories", value: "French Southern Territories"}, {label: 
"Togo", value: "Togo"}, {label: "Chad", value: "Chad"}, {label: "Turks and Caicos Islands", value: "Turks and Caicos Islands"}, {label: "Libya", value: "Libya"}, {label: "Vatican", value: "Vatican"}, {label: "Saint Vincent and the Grenadines", value: "Saint Vincent and the Grenadines"}, {label: "United Arab Emirates", value: "United Arab Emirates"}, {label: "Andorra", value: "Andorra"}, {label: "Antigua and Barbuda", value: "Antigua and Barbuda"}, {label: "Afghanistan", value: "Afghanistan"}, {label: "Anguilla", value: "Anguilla"}, {label: "U.S. Virgin Islands", value: "U.S. Virgin Islands"}, {label: "Iceland", value: "Iceland"}, {label: "Iran", value: "Iran"}, {label: "Armenia", value: "Armenia"}, {label: "Albania", value: "Albania"}, {label: "Angola", value: "Angola"}, {label: "Antarctica", value: "Antarctica"}, {label: "American Samoa", value: "American Samoa"}, {label: "Argentina", value: "Argentina"}, {label: "Australia", value: "Australia"}, {label: "Austria", value: "Austria"}, {label: "Aruba", value: "Aruba"}, {label: "India", 
value: "India"}, {label: "Aland Islands", value: "Aland Islands"}, {label: "Azerbaijan", value: "Azerbaijan"}, {label: "Ireland", value: "Ireland"}, {label: "Indonesia", value: "Indonesia"}, {label: "Ukraine", value: "Ukraine"}, {label: "Qatar", value: "Qatar"}, {label: "Mozambique", value: "Mozambique"}]
