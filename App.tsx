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
import StartSlides from './startSlides/StartSlider';

const db = SQLite.openDatabase(
  {
    name: 'db.db',
    location: 'default',
    createFromLocation: 1,
  },
  () => {},
  () => {},
);

// 0: loading, 1: already launched, 2: firstLaunch

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [theme, setStateTheme] = React.useState('light');
  const [isFirstLaunch, setFirstLaunch] = React.useState(false);

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
      checkIfFirstLaunch();
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

  const checkIfFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem(data.HAS_LAUNCHED);
      if (hasLaunched === null) {
        AsyncStorage.setItem(data.HAS_LAUNCHED, 'true');
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        {isFirstLaunch ? (
          <StartSlides onDone={() => setFirstLaunch(false)} />
        ) : (
          <Navigation />
        )}
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
};

export default App;
