// import components from React Native
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route }) => {
  //extract the name route parameter passed from Start
  const { name } = route.params;
  //extract the background route parameter passed from Start
  const { background } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={[styles.text, styles.Title]}> This is the Chat!</Text>
      <Text style={styles.text}> Username: {name}</Text>
    </View>
  );
};

//Create style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  Title: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default Chat;
