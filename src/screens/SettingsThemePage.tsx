import React from 'react';
import ThemeContext from '../context/ThemeContext';
import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import {LocalizationContext} from '../context/LocalizationContext';
import ListeItemCheck from '../components/list/ListeItemCheck';
import AsyncStorage from '@react-native-community/async-storage';
import keys from '../../database/keys/keys';

interface CardTheme {
  title: string;
  value: string;
}

export default function SelectLanguagePage() {
  const {translations, appLanguage, setAppLanguage} = React.useContext(
    LocalizationContext,
  );
  const [cardTheme, setCardTheme] = React.useState('default');

  const defaultCardThemes: CardTheme[] = [
    {value: 'default', title: translations.DEFAULT},
    {value: 'orange', title: translations.ORANGE},
    {value: 'red', title: translations.RED},
    {value: 'blue', title: translations.BLUE},
    {value: 'green', title: translations.GREEN},
    {value: 'violet', title: translations.VIOLET},
  ];

  const {theme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
  });

  React.useEffect(() => {
    (async () => {
      const cardColor = await AsyncStorage.getItem(keys.CARDS_THEME);
      if (cardColor) setCardTheme(cardColor);
    })();
  }, []);

  const onChangeCardTheme = async (index: number) => {
    AsyncStorage.setItem(keys.CARDS_THEME, defaultCardThemes[index].value).then(
      () => {
        setCardTheme(defaultCardThemes[index].value);
      },
    );
  };

  return (
    <View style={styles.container}>
      {defaultCardThemes.map((theme: CardTheme, index) => (
        <View key={index}>
          <ListeItemCheck
            selected={theme.value == cardTheme}
            text={theme.title}
            onPress={() => onChangeCardTheme(index)}
          />
        </View>
      ))}
    </View>
  );
}
