import { Alert } from 'react-native';
import { useEffect } from 'react';
//To initialize a connection for Firestore import initializeApp() and getFirestore()
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';

//import child components
import Start from './components/Start';
import Chat from './components/Chat';

// import React Navigation library
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import useNetInfo for network connection state
import { useNetInfo } from '@react-native-community/netinfo';

//import getStorage to store images at Firebase
import { getStorage } from 'firebase/storage';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  //define state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  //use useEffect() to display an alert popup if network connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      //Firebase will keep attempting to reconnect to the Firestore Database.
      //disable these attempts by calling the Firestore function disableNetwork(db)
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      //re-enable by calling Firestore function enableNetwork(db)
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  //Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyCfO9_Qph_muGtU8U4IgR-hOzdtyAMcnhA',
    authDomain: 'chatapp-b1fe8.firebaseapp.com',
    projectId: 'chatapp-b1fe8',
    storageBucket: 'chatapp-b1fe8.appspot.com',
    messagingSenderId: '307748943604',
    appId: '1:307748943604:web:13a28f428490e6f15e50a1',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // initialize the storage handler to store images
  const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {/* pass db props to the Chat component */}
          {/* pass the boolean value of connectionStatus.isConnected to the Chat component as a prop called isConnected */}
          {/* pass storage to the Chat component as a prop */}
          {(props) => (
            <Chat
              db={db}
              isConnected={connectionStatus.isConnected}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
