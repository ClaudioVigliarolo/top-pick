import React from 'react';
import {StatusBar} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeContext from './src/context/ThemeContext';
import AsyncStorage from '@react-native-community/async-storage';
import Navigation from './src/navigation';
import RNBootSplash from 'react-native-bootsplash';
import keys from './database/keys/keys';
import {LocalizationContext} from './src/context/LocalizationContext';
import StartSlides from './src/startSlides/StartSlider';
import {LocalizationProvider} from './src/context/LocalizationContext';
import {updateTopics} from './src/utils/api';
import UpdateContext from './src/context/UpdateContext';
import {
  getLastUpdate,
  getStoredLanguage,
  getUpdateSettings,
  isConnected,
  readTheme,
} from './src/utils/utils';

// 0: loading, 1: already launched, 2: firstLaunch
const App = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [theme, setStateTheme] = React.useState<string>('light');
  const [isLoadingContent, setStateLoadingContent] = React.useState<boolean>(
    false,
  );
  const [isUpdatedContent, setStateUpdatedContent] = React.useState<boolean>(
    false,
  );
  const {configureLanguage} = React.useContext(LocalizationContext);

  const [isFirstLaunch, setFirstLaunch] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setStateTheme(await readTheme());
    })();

    (async () => {
      configureLanguage();
    })();

    (async () => {
      checkIfFirstLaunch();
    })();

    (async () => {
      (await getUpdateSettings()) &&
        (await isConnected()) &&
        (await updateTopics(
          await getLastUpdate(),
          await getStoredLanguage(),
          setUpdatedContent,
          setLoadingContent,
        ));
    })();

    (async () => {
      await RNBootSplash.hide({fade: true});
    })();

    setLoading(false);
  }, []);

  const checkIfFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem(keys.HAS_LAUNCHED);
      if (hasLaunched === null) {
        AsyncStorage.setItem(keys.HAS_LAUNCHED, 'true');
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
      await AsyncStorage.setItem(keys.THEME_KEY, newTheme);
    } catch (e) {}
  };

  const setLoadingContent = async (val: boolean) => {
    setStateLoadingContent(val);
  };

  const setUpdatedContent = async (val: boolean) => {
    setStateUpdatedContent(val);
  };

  const themeVal = {theme, setTheme};
  const loadingVal = {
    isLoadingContent,
    setLoadingContent,
    setUpdatedContent,
    isUpdatedContent,
  };

  if (loading) return null;

  return (
    <ThemeContext.Provider value={themeVal}>
      <UpdateContext.Provider value={loadingVal}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <MenuProvider>
          <LocalizationProvider>
            <SafeAreaProvider>
              <SafeAreaProvider>
                {isFirstLaunch ? (
                  <StartSlides onDone={() => setFirstLaunch(false)} />
                ) : (
                  <Navigation />
                )}
              </SafeAreaProvider>
            </SafeAreaProvider>
          </LocalizationProvider>
        </MenuProvider>
      </UpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
