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

const Chat = ({ route, navigation, db }) => {
  //extract the name route parameter passed from Start
  const { name } = route.params;
  //extract the background route parameter passed from Start
  const { background } = route.params;

  //use the setOptions function of the navigation prop to set the navigation header’s title
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  //create state variable with initial state empty array
  const [messages, setMessages] = useState([]);

  //use useEffect for messages
  //Messages must follow a certain format to work with the Gifted Chat library.
  //each message requires an ID, a creation date, and a user object.
  //user object requires a user ID, name, and avatar.
  useEffect(() => {
    //use onSnapshot() that returns the listener unsubscribe function, which is referenced with unsubMessages
    //use query, orderBy functions
    //Define the query reference in a separate line to make easier to read
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

    // code to execute when component mounted or updated
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });

    //code to execute when the component will be unmounted
    //add if statement to check if the unsubMessage isn't undefined. This is a protection procedure in case the onSnapshot() function call fails.
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

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
          _id: 1,
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
