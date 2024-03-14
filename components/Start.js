// import components from React Native
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
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
              placeholderTextColor="#757083"
            ></TextInput>
          </View>

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
    justifyContent: 'center',
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
  },
  icon: {
    width: '10%',
    height: '25%',
  },
  textInput: {
    width: '88%',
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#757083',
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
});

export default Start;
