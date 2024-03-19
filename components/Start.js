import { useState } from 'react';

// import components from React Native
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';

//import SVG component
import SvgIcon from './SvgIcon';

//import functions for Firebase Anonymous Authentication
import { getAuth, signInAnonymously } from 'firebase/auth';

//use img for bg
const bgImg = require('../img/Background Image.png');

const Start = ({ navigation }) => {
  //create state variable  with initial state ''
  const [name, setName] = useState('');
  //create state variable  with initial state ''
  const [background, setBackground] = useState('');

  //create state varables for picked color of color picker
  const [pickedcolor1, setPickedcolor1] = useState(false);
  const [pickedcolor2, setPickedcolor2] = useState(false);
  const [pickedcolor3, setPickedcolor3] = useState(false);
  const [pickedcolor4, setPickedcolor4] = useState(false);

  //create state variable for responsiveness in case of keypad usage
  const [focus, setFocus] = useState(false);

  //initialize the Firebase authentication handler
  const auth = getAuth();

  //create function for sign-in logic
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          userID: result.user.uid,
          name,
          background,
        });
        Alert.alert('Signed in Successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in, try later again.');
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImg} resizeMode="cover" style={styles.bgImg}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>App Title</Text>
        </View>
        <View
          // style={styles.settingsContainer}
          // use ternary operator and style the View component if focus is true
          style={
            focus
              ? [styles.settingsContainer, styles.settingsContainerHeight]
              : styles.settingsContainer
          }
        >
          <View style={styles.inputContainer}>
            <SvgIcon style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Type your username here"
              placeholderTextColor="#b0acb9"
              value={name}
              onChangeText={setName}
              onTouchStart={() => setFocus(true)}
              returnKeyType="done"
              onSubmitEditing={() => setFocus(false)}
            ></TextInput>
          </View>
          {/* Color Picker Section: Start  */}
          <View style={{ width: '88%' }}>
            <Text style={styles.colorText}>Choose Background Color:</Text>
            <View style={styles.colorContainer}>
              <View
                // use ternary operator and style the View component if pickedcolor1 is true
                style={pickedcolor1 ? styles.pickedColor : styles.noPickedColor}
              >
                <TouchableOpacity
                  style={[styles.colorTemplate, styles.colorOne]}
                  // onPress={() => setBackground(styles.colorOne.backgroundColor)}
                  onPress={() => {
                    setBackground(styles.colorOne.backgroundColor);
                    setPickedcolor1(true);
                    setPickedcolor2(false);
                    setPickedcolor3(false);
                    setPickedcolor4(false);
                  }}
                ></TouchableOpacity>
              </View>
              <View
                // use ternary operator and style the View component if pickedcolor2 is true
                style={pickedcolor2 ? styles.pickedColor : styles.noPickedColor}
              >
                <TouchableOpacity
                  style={[styles.colorTemplate, styles.colorTwo]}
                  // onPress={() => setBackground(styles.colorTwo.backgroundColor)}
                  onPress={() => {
                    setBackground(styles.colorTwo.backgroundColor);
                    setPickedcolor1(false);
                    setPickedcolor2(true);
                    setPickedcolor3(false);
                    setPickedcolor4(false);
                  }}
                ></TouchableOpacity>
              </View>
              <View
                // use ternary operator and style the View component if pickedcolor3 is true
                style={pickedcolor3 ? styles.pickedColor : styles.noPickedColor}
              >
                <TouchableOpacity
                  style={[styles.colorTemplate, styles.colorThree]}
                  // onPress={() =>
                  //   setBackground(styles.colorThree.backgroundColor)
                  // }
                  onPress={() => {
                    setBackground(styles.colorThree.backgroundColor);
                    setPickedcolor1(false);
                    setPickedcolor2(false);
                    setPickedcolor3(true);
                    setPickedcolor4(false);
                  }}
                ></TouchableOpacity>
              </View>
              <View
                // use ternary operator and style the View component if pickedcolor4 is true
                style={pickedcolor4 ? styles.pickedColor : styles.noPickedColor}
              >
                <TouchableOpacity
                  style={[styles.colorTemplate, styles.colorFour]}
                  // onPress={() => setBackground(styles.colorFour.backgroundColor)}
                  onPress={() => {
                    setBackground(styles.colorFour.backgroundColor);
                    setPickedcolor1(false);
                    setPickedcolor2(false);
                    setPickedcolor3(false);
                    setPickedcolor4(true);
                  }}
                ></TouchableOpacity>
              </View>
            </View>
          </View>
          {/* End: Color Picker Section  */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              signInUser();
              setFocus(false);
            }}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

//Create style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 100,
  },
  title: {
    color: 'white',
    fontSize: 45,
    fontWeight: '600',
  },
  settingsContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',

    width: '88%',
    height: '44%',
    marginBottom: 30,
  },
  settingsContainerHeight: {
    height: '70%',
  },
  inputContainer: {
    width: '88%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#757083',
    borderRadius: 2,
    paddingLeft: 20,
    marginBottom: 10,
  },
  icon: {
    width: '10%',
    height: '30%',
  },
  textInput: {
    width: '88%',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  bgImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#757083',
    marginBottom: 13,
    alignSelf: 'center',
  },
  colorTemplate: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  colorOne: {
    backgroundColor: '#090C08',
  },
  colorTwo: {
    backgroundColor: '#474056',
  },
  colorThree: {
    backgroundColor: '#8A95A5',
  },
  colorFour: {
    backgroundColor: '#B9C6AE',
  },
  button: {
    width: '88%',
    backgroundColor: '#757083',
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  pickedColor: {
    padding: 2,
    borderWidth: 2,
    borderColor: '#757083',
    borderRadius: 50,
  },
  noPickedColor: {
    padding: 2,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
  },
});

export default Start;
