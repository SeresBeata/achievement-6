// import components from React Native
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route }) => {
  //extract the name route parameter passed from Start
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text> This is the Chat!</Text>
      <Text> Username: {name}</Text>
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
});

export default Chat;
