// import components from React Native
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const Start = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>App Title</Text>
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Type your username here"
        ></TextInput>
        <Button
          title="Start Chatting"
          onPress={() => navigation.navigate('Chat')}
        />
      </View>
    </View>
  );
};

//Create style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
});

export default Start;
