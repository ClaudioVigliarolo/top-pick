import React from 'react';
import {StatusBar} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeContext from './src/context/ThemeContext';
import AsyncStorage from '@react-native-community/async-storage';
import Navigation from './src/navigation';
import RNBootSplash from 'react-native-bootsplash';
import data from './database/keys/keys';
import {LocalizationContext} from './src/context/LocalizationContext';
import StartSlides from './src/startSlides/StartSlider';
import {LocalizationProvider} from './src/context/LocalizationContext';

// 0: loading, 1: already launched, 2: firstLaunch

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [theme, setStateTheme] = React.useState('light');
  const {
    translations,
    appLanguage,
    configureLanguage,
    setAppLanguage,
  } = React.useContext(LocalizationContext);

  const [language, setLanguage] = React.useState('');
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
      configureLanguage();
    })();

    (async () => {
      checkIfFirstLaunch();
    })();

    (async () => {
      await RNBootSplash.hide({fade: true});
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
    } catch (e) {}
  };

  const themeVal = {theme, setTheme};
  if (loading) return null;

  return (
    <ThemeContext.Provider value={themeVal}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <MenuProvider>
        <LocalizationProvider>
          <SafeAreaProvider>
            {isFirstLaunch ? (
              <StartSlides onDone={() => setFirstLaunch(false)} />
            ) : (
              <Navigation />
            )}
          </SafeAreaProvider>
        </LocalizationProvider>
      </MenuProvider>
    </ThemeContext.Provider>
  );
};

export default App;
