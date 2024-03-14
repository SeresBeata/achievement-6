// import components from React Native
import { StyleSheet, View, Text } from 'react-native';

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text> This is the Chat!</Text>
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
