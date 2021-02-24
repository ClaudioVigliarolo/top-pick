import * as React from 'react';
import {
  StyleSheet,
  Alert,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getColor} from '../constants/Themes';
import {LocalizationContext} from '../context/LocalizationContext';
import ThemeContext from '../context/ThemeContext';
import Dimensions from '../constants/Dimensions';
import ListItem from '../components/list/ListItem';
import SQLite from 'react-native-sqlite-storage';
import Picker from '../components/custom/LanguagePicker';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';
import ListItemCheckBox from '../components/list/ListItemCheckbox';

const db = SQLite.openDatabase(
  {
    name: 'db.db',
    location: 'default',
    createFromLocation: 1,
  },
  () => {},
  () => {},
);

export default function CategoryList({navigation}: {navigation: any}) {
  const [isAlert, setAlert] = React.useState<boolean>(false);
  const {translations, appLanguage, setAppLanguage} = React.useContext(
    LocalizationContext,
  );

  const handleSetLanguage = async (language: string) => {
    setAppLanguage(language);
  };

  const {theme} = React.useContext(ThemeContext);
  React.useEffect(() => {}, []); // Only re-run the effect if co unt changes

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: getColor(theme, 'primaryBackground'),
    },

    text: {
      color: getColor(theme, 'primaryOrange'),
      textAlign: 'center',
      fontSize: Dimensions.fontMed,
    },
  });

  const showAlert = () => {
    setAlert(true);
  };

  const resetDB = (): void => {
    /*   SQLite.deleteDatabase(
      {name: 'db.db', location: 'default'},
      () => {
        console.log('second db deleted');
      },
      () => {
        console.log('ERROR');
      },
    ); */

    AsyncStorage.clear();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: getColor(theme, 'primaryBackground'),
      }}>
      <ListItem
        text="Language"
        onPress={() => {
          navigation.navigate('Language');
        }}
        icon={false}
        secondaryText=""
      />

      <ListItem
        text="Reset To Default"
        onPress={showAlert}
        icon={false}
        secondaryText=""
      />

      <ListItem
        text="Cards Theme"
        onPress={showAlert}
        onPress={() => {
          navigation.navigate('Theme');
        }}
        icon={false}
        secondaryText=""
      />

      <ListItemCheckBox
        text="automatic update"
        onPress={showAlert}
        value={true}
        onValChange={() => {}}
        secondaryText=""
      />

      {isAlert && (
        <AwesomeAlert
          show={isAlert}
          showProgress={false}
          title="Reset App"
          message="All the local settings and local questions will be deleted. You cannot undo this operation "
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          messageStyle={{textAlign: 'center'}}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No,Cancel"
          confirmText="Ok,Delete"
          confirmButtonColor={getColor(theme, 'primaryOrange')}
          onCancelPressed={() => {
            setAlert(false);
          }}
          onConfirmPressed={() => {
            resetDB();
            setAlert(false);
          }}
        />
      )}
    </View>
  );
}
