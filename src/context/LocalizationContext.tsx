import React, {createContext, useState} from 'react';
import translations, {DEFAULT_LANGUAGE} from './translations';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';
import keys from '../../database/keys/keys';

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: (newLang: string) => {},
  configureLanguage: async () => {},
  appLanguage: DEFAULT_LANGUAGE,
});

export const LocalizationProvider = ({children}: {children: any}) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  const setLanguage = async (language: string) => {
    console.log('setttting', language);
    translations.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(keys.LANGUAGE_KEY, language);
  };

  const configureLanguage = async () => {
    ('00 OKK');
    const currentLanguage = await AsyncStorage.getItem(keys.LANGUAGE_KEY);
    if (!currentLanguage) {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        (locale) => locale.languageCode,
      );
      phoneLocaleCodes.some((code) => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    } else {
      setLanguage(currentLanguage);
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        appLanguage,
        configureLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
