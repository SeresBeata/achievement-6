import { useState, useEffect } from 'react';

//import the Gifted Chat library
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';

// import components from React Native
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const Chat = ({ route }) => {
  //extract the name route parameter passed from Start
  const { name } = route.params;
  //extract the background route parameter passed from Start
  const { background } = route.params;

  //create state variable with initial state empty array
  const [messages, setMessages] = useState([]);

  //use useEffect for messages
  //Messages must follow a certain format to work with the Gifted Chat library.
  //each message requires an ID, a creation date, and a user object.
  //user object requires a user ID, name, and avatar.
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar:
            'https://fastly.picsum.photos/id/38/200/200.jpg?hmac=dmdbTgVfAkQ41DmAJKt2u_w6vmqFO_UQ_Ro7F9U-Yws',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  //create custom function
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      //use append() function provided by GiftedChat, which appends the new message
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  //create the renderBubble function to change color of bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#b0acb9',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  //create renderSystemMessage function to change the style of SystemMessage
  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

//Create style
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chat;
