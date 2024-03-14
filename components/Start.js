// import components from React Native
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

//import SVG component
import SvgIcon from './SvgIcon';

//use img for bg
const bgImg = require('../img/Background Image.png');

const Start = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={bgImg} resizeMode="cover" style={styles.bgImg}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>App Title</Text>
        </View>
        <View style={styles.settingsContainer}>
          <View style={styles.inputContainer}>
            <SvgIcon style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="Type your username here"
              placeholderTextColor="#b0acb9"
            ></TextInput>
          </View>
          {/* Color Picker Section: Start  */}
          <View style={{ width: '88%' }}>
            <Text style={styles.colorText}>Choose Background Color:</Text>
            <View style={styles.colorContainer}>
              <TouchableOpacity
                style={[styles.colorTemplate, styles.colorOne]}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorTemplate, styles.colorTwo]}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorTemplate, styles.colorThree]}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorTemplate, styles.colorFour]}
              ></TouchableOpacity>
            </View>
          </View>
          {/* End: Color Picker Section  */}
          <Button
            title="Start Chatting"
            onPress={() => navigation.navigate('Chat')}
          />
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
});

export default Start;
