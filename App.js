import { StyleSheet, View } from 'react-native';

//import child components
import Start from './components/Start';
import Chat from './components/Chat';

const App = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
