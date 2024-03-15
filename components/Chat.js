import { useState, useEffect } from 'react';

//import the Gifted Chat library
import { GiftedChat } from 'react-native-gifted-chat';

// import components from React Native
import { StyleSheet, View, Text } from 'react-native';

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
          avatar: 'https://placeimg.com/140/140/any',
        },
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

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
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
