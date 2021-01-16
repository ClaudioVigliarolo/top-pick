// React Native Bottom Action Menu
// https://aboutreact.com/react-native-bottom-action-menu/

// import React in our code
import React, {useRef} from 'react';
import CustomButton from './CustomButton';
import Colors from '../../constants/Colors';
import Dimensions from '../../constants/Dimensions';
import ThemeContext from '../../context/ThemeContext';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Alert,
} from 'react-native';

// import ActionSheet
import ActionSheet from 'react-native-actionsheet';

interface ButtonsModalProps {
  isActive: boolean;
  onHide: Function;
  title: string;
  data: string[];
  onPress(name: string): void;
  color: string;
  backgroundColor: string;
  actionSheet: any;
}

const BottomsDownToUp = (props: ButtonsModalProps) => {
  const {theme, setTheme} = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    buttonStyle: {
      width: '100%',
      height: 40,
      padding: 10,
      color: Colors[theme].primaryOrange,
      backgroundColor: 'red',

      marginTop: 30,
    },
    buttonTextStyle: {
      color: Colors[theme].whiteText,
      textAlign: 'center',
      backgroundColor: 'red',
    },
    titleStyle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 10,
    },
  });

  return (
    <ActionSheet
      ref={props.actionSheet}
      // Title of the Bottom Sheet
      title={'Ready To Talk'}
      // Options Array to show in bottom sheet
      options={props.data}
      tintColor={Colors[theme].primaryOrange}
      // Define cancel button index in the option array
      // This will take the cancel option in bottom
      // and will highlight it
      cancelButtonIndex={props.data.length - 1}
      // Highlight any specific option
      onPress={(index) => {
        // Clicking on the option will give you alert
        props.onPress(props.data[index]);
      }}
    />
  );
};
export default BottomsDownToUp;
