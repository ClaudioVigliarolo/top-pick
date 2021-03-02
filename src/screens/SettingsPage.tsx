import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {getColor} from '../constants/Themes';
import {LocalizationContext} from '../context/LocalizationContext';
import ThemeContext from '../context/ThemeContext';
import SQLite from 'react-native-sqlite-storage';
import ListItem from '../components/list/ListItem';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-community/async-storage';
import ListItemCheckBox from '../components/list/ListItemCheckbox';
import keys from '../../database/keys/keys';
import {getUpdateSettings} from '../utils/utils';

export default function SettingsPage({navigation}: {navigation: any}) {
  const [isAlert, setAlert] = React.useState<boolean>(false);
  const [isUpdate, setUpdate] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      console.log('figs2!');
      setUpdate(await getUpdateSettings());
    })();
  }, []);

  const {translations} = React.useContext(LocalizationContext);

  const {theme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {},
  });

  const showAlert = () => {
    setAlert(true);
  };

  const resetDB = (): void => {
    SQLite.deleteDatabase(
      {name: 'db.db', location: 'default'},
      () => {
        console.log('second db deleted');
      },
      () => {
        console.log('ERROR');
      },
    );

    AsyncStorage.clear();
  };

  const setUpdateSettings = async (newVal: boolean) => {
    AsyncStorage.setItem(keys.SETTINGS_UPDATE, newVal.toString()).then(() => {
      setUpdate(newVal);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: getColor(theme, 'primaryBackground'),
      }}>
      <ListItem
        text={translations.SELECT_LANGUAGE}
        onPress={() => {
          navigation.navigate('Language');
        }}
        icon={false}
      />

      <ListItem
        text={translations.CHANGE_THEME}
        onPress={showAlert}
        onPress={() => {
          navigation.navigate('Theme');
        }}
        icon={false}
        secondaryText=""
      />
      <ListItemCheckBox
        text={translations.AUTOMATIC_UPDATE}
        value={isUpdate}
        onValChange={(newVal: boolean) => setUpdateSettings(newVal)}
      />

      <ListItem text="Reset To Default" onPress={showAlert} icon={false} />

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
