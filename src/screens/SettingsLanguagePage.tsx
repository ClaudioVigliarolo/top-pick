import React from 'react';
import ThemeContext from '../context/ThemeContext';
import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import {LocalizationContext} from '../context/LocalizationContext';
import ListeItemCheck from '../components/list/ListeItemCheck';
interface Language {
  label: string;
  value: string;
}
const defaultLanguages: Language[] = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Italiano',
    value: 'it',
  },
];

export default function SelectLanguagePage() {
  const {translations, appLanguage, setAppLanguage} = React.useContext(
    LocalizationContext,
  );
  const {theme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
  });

  const onValChange = (index: number): void => {
    setAppLanguage(defaultLanguages[index]['value']);
  };

  return (
    <View style={styles.container}>
      {defaultLanguages.map((language, index) => (
        <View key={index}>
          <ListeItemCheck
            selected={language.value == appLanguage}
            text={language.label}
            onPress={() => onValChange(index)}
          />
        </View>
      ))}
    </View>
  );
}
