import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeContext from './context/ThemeContext';
import AsyncStorage from '@react-native-community/async-storage';
import Navigation from './navigation';
import RNBootSplash from 'react-native-bootsplash';
import data from './database/keys';
import SQLite, {
  ResultSet,
  SQLiteDatabase,
  Transaction,
} from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'db.db',
    location: 'default',
    createFromLocation: 1,
  },
  () => {},
  () => {},
);

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [theme, setStateTheme] = React.useState('light');

  const readTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem(data.THEME_KEY);
      if (theme === null || theme == 'light') {
        setStateTheme('light');
      } else {
        setStateTheme('dark');
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage');
    }
  };

  React.useEffect(() => {
    (async () => {
      readTheme();
    })();

    (async () => {
      loadDB();
    })();

    (async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    })();
    setLoading(false);
  }, []);

  const setTheme = async (newTheme: string) => {
    try {
      setStateTheme(newTheme);
      await AsyncStorage.setItem(data.THEME_KEY, newTheme);
      console.log('Data successfully saved');
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
  };

  const loadDB = () => {
    console.log('calling useEffect');
    db.transaction((tx: Transaction) => {
      tx.executeSql(
        'SELECT * FROM categories;',
        [],
        (tx: Transaction, results: ResultSet) => {
          const rows = results.rows;
          let users = [];
          for (let i = 0; i < rows.length; i++) {
            users.push({
              ...rows.item(i),
            });
          }
        },
      );
    });
  };
  const value = {theme, setTheme};

  if (loading) return null;
  return (
    <ThemeContext.Provider value={value}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
};

export default App;
