import { useState, useEffect } from 'react';

//import the Gifted Chat library
import {
  GiftedChat,
  Bubble,
  SystemMessage,
  Day,
  Send,
} from 'react-native-gifted-chat';

// import components from React Native
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// import functions from Firebase
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

//import AsyncStorage for Local Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, db, isConnected }) => {
  //extract the name route parameter passed from Start
  const { name } = route.params;
  //extract the background route parameter passed from Start
  const { background } = route.params;
  //use userID, extract it from route.params
  const { userID } = route.params;

  //create state variable with initial state empty array
  const [messages, setMessages] = useState([]);

  //use useEffect for messages
  //Messages must follow a certain format to work with the Gifted Chat library.
  //each message requires an ID, a creation date, and a user object.
  //user object requires a user ID, name, and avatar.
  useEffect(() => {}, []);

  //create a new async function called loadCachedLists()
  //call this function if the isConnected prop turns out to be false in useEffect()
  const loadCachedLists = async () => {
    const cachedMessages = (await AsyncStorage.getItem('new_messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  //use AsyncStorage.setItem() to cach data
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem(
        'new_messages',
        JSON.stringify(messagesToCache)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  //create custom function
  const onSend = (newMessages) => {
    //Use the addDoc() Firestore function to save the passed message to the function in the database.
    addDoc(collection(db, 'messages'), newMessages[0]);
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

  //create rebderDay function to change the style of Day
  const renderDay = (props) => {
    return <Day {...props} textStyle={styles.DayText} />;
  };

  //create renderSend function to change the style of Send btn
  const renderSend = (props) => {
    return (
      <Send
        {...props}
        containerStyle={{
          height: 40,
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.SendText}>SEND</Text>
      </Send>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderDay={renderDay}
        renderSend={renderSend}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderUsernameOnMessage={true} // default is false
        user={{
          _id: userID,
          name: name,
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
  DayText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  SendText: {
    padding: 5,
    backgroundColor: 'plum',
    color: 'white',
    borderRadius: 50,
    fontWeight: 'bold',
  },
});

export default Chat;
