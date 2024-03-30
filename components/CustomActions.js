//import components from React Native
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//import useActionSheet
//do not need to install @expo/react-native-action-sheet because it is already installed with react-native-gifted-chat module
import { useActionSheet } from '@expo/react-native-action-sheet';

//create child component
const CustomActions = ({ wrapperStyle, iconTextStyle }) => {
  //use useActionSheet()
  const actionSheet = useActionSheet();

  //create function to display action menu "ActionSheet" that contains options
  const onActionPress = () => {
    //define an array of strings to display in the ActionSheet
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    //determine the position of cancel button of ActionSheet, so that ActionSheet can close the view if the user presses "Cancel"
    const cancelButtonIndex = options.length - 1;

    //use showActionSheetWithOptions() function to initialize and show the ActionSheet
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

//create style
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingTop: 3,
  },
});

export default CustomActions;
