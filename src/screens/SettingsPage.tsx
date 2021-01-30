import * as React from 'react';
import {
  StyleSheet,
  Alert,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {List, Text} from 'native-base';
import {getColor} from '../constants/Themes';
import {LocalizationContext} from '../context/LocalizationContext';
import ListItemDrag from '../components/list/ListItemDrag';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ThemeContext from '../context/ThemeContext';
import Dimensions from '../constants/Dimensions';
import ListItem from '../components/list/ListItem';
import SQLite from 'react-native-sqlite-storage';
import Picker from '../components/custom/LanguagePicker';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';

const db = SQLite.openDatabase(
  {
    name: 'db.db',
    location: 'default',
    createFromLocation: 1,
  },
  () => {},
  () => {},
);

interface Item {
  id: number;
  title: string;
  selected: boolean;
  liked: boolean;
}

export default function CategoryList({navigation}: {navigation: any}) {
  const [isAlert, setAlert] = React.useState<boolean>(false);
  const {translations, appLanguage, setAppLanguage} = React.useContext(
    LocalizationContext,
  );

  const handleSetLanguage = async (language: string) => {
    console.log('handdddle');
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
    SQLite.deleteDatabase(
      {name: 'db.db', location: 'default'},
      () => {
        console.log('second db deleted');
        AsyncStorage.clear();
      },
      () => {
        console.log('ERROR');
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: getColor(theme, 'primaryBackground'),
      }}>
      <Picker
        onLanguageChange={(newLang: string) => handleSetLanguage(newLang)}
        title={translations.LANGUAGE_SELECT}
        selected={translations.getLanguage()}
      />

      <ListItem
        text="Reset"
        onPress={showAlert}
        icon={false}
        secondaryText=""
      />
      {isAlert && (
        <AwesomeAlert
          show={isAlert}
          showProgress={false}
          title="Reset App"
          message="All Your data and questions will get deleted. You cannot undo this operation "
          closeOnTouchOutside={true}
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
