import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ThemeContext from '../../context/ThemeContext';
import {getColor} from '../../constants/Themes';
import Dimensions from '../../constants/Dimensions';

interface EditOverlayProps {
  isVisible: boolean;
  text: string;
  onChangeText: any;
  onSubmit: any;
  onClose(): any;
}

const EditOverlay = (props: EditOverlayProps) => {
  const {theme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: getColor(theme, 'primaryHeaderBackground'),
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'column',
      alignContent: 'center',
    },
    editingContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: getColor(theme, 'primaryBackground'),
      width: '100%',
      maxHeight: 200,
    },
    editing: {
      width: '100%',
      textAlignVertical: 'center',
      height: 100,
      alignSelf: 'center',
    },
    textInput: {
      color: getColor(theme, 'primaryText'),
      padding: 10,
    },
    header: {
      color: '#fff',
      textAlign: 'center',
      fontSize: Dimensions.fontMed,
      marginBottom: 20,
    },
  });

  return (
    <React.Fragment>
      {props.isVisible && (
        <View style={styles.container}>
          <AntDesign
            name="close"
            onPress={props.onClose}
            size={35}
            style={{
              color: '#fff',
              position: 'absolute',
              right: '2%',
              top: '5%',
              opacity: 0.7,
            }}
          />
          <Text style={styles.header}>Editing Question</Text>

          <View style={styles.editingContainer}>
            <TextInput
              style={styles.textInput}
              multiline={true}
              value={props.text}
              onSubmitEditing={props.onSubmit}
              autoFocus={true}
              onChangeText={props.onChangeText}
            />
          </View>
        </View>
      )}
    </React.Fragment>
  );
};

export default EditOverlay;
