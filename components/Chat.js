import { useState, useEffect } from 'react';

//import the Gifted Chat library
import {
  GiftedChat,
  Bubble,
  SystemMessage,
  Day,
  Send,
  InputToolbar,
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

//import child component
import CustomActions from './CustomActions';

//import MapView component
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, db, isConnected }) => {
  //extract the name route parameter passed from Start
  const { name } = route.params;
  //extract the background route parameter passed from Start
  const { background } = route.params;
  //use userID, extract it from route.params
  const { userID } = route.params;

  //create state variable with initial state empty array
  const [messages, setMessages] = useState([]);

  // declare the variable outside useEffect
  let unsubMessages;

  //use useEffect for messages
  //Messages must follow a certain format to work with the Gifted Chat library.
  //each message requires an ID, a creation date, and a user object.
  //user object requires a user ID, name, and avatar.
  useEffect(() => {
    //use the setOptions function of the navigation prop to set the navigation header’s title
    navigation.setOptions({ title: name });

    //fetch messages from the Firestore Database only if there’s a network connection
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      //use onSnapshot() that returns the listener unsubscribe function, which is referenced with unsubMessages
      //use query, orderBy functions
      //Define the query reference in a separate line to make easier to read
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

      // code to execute when component mounted or updated
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedLists(); //if there’s no network connection call loadCachedLists()

    //code to execute when the component will be unmounted
    //add if statement to check if the unsubMessage isn't undefined. This is a protection procedure in case the onSnapshot() function call fails.
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

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

  //disables toolbar if user loses connection
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  //create function for the custom componet "+" btn
  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  //create function for custom component to render location data
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    //use if conditional statement: if there is location data, then return <MapView> component with the location data, otherwise return nothing
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 250, height: 200, borderRadius: 13, margin: 10 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
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
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
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
