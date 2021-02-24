import React from 'react';
import {getColor} from '../constants/Themes';
import ThemeContext from '../context/ThemeContext';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {LocalizationContext} from '../context/LocalizationContext';
import {ListItem} from 'native-base';

interface Language {
  label: string;
  value: string;
  selected: boolean;
}
const defaultLanguages: Language[] = [
  {
    label: 'English',
    value: 'en',
    selected: false,
  },
  {
    label: 'Italiano',
    value: 'it',
    selected: false,
  },
];

export default function SelectLanguagePage() {
  const [languages, setLanguages] = React.useState<Language[]>(
    defaultLanguages,
  );
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'red',
    },
  });

  return (
    <View style={styles.container}>
      {languages.map((language, index) => {
        {
          console.log(language);
        }
        <ListItem
          key={index}
          icon={language.selected}
          secondaryText="ss"
          text={language.label}
          onPress={() => {}}
        />;
      })}
    </View>
  );
}
