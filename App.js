import { StyleSheet, View } from 'react-native';
//To initialize a connection for Firestore import initializeApp() and getFirestore()
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//import child components
import Start from './components/Start';
import Chat from './components/Chat';

// import React Navigation library
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
