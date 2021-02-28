import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Topic, Category} from '../interfaces/Interfaces';
import {LocalizationContext} from '../context/LocalizationContext';
import ThemeContext from '../context/ThemeContext';
import {getColor} from '../constants/Themes';
import ListItem from '../components/list/ListItem';
import {getDB} from '../utils/utils';

export default function TopicsPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {theme} = React.useContext(ThemeContext);
  const {translations, appLanguage, setAppLanguage} = React.useContext(
    LocalizationContext,
  );
  const [items, setItems] = React.useState<Topic[]>([]);
  const {category} = route.params;

  React.useEffect(() => {
    console.log('yuppppi');
    getDB().transaction((tx) => {
      tx.executeSql(
        `SELECT t.title
        FROM topics${translations.DB_NAME} t
        WHERE t.title IN(
            SELECT c.topic 
            FROM category_topics${translations.DB_NAME} c
            WHERE c.category = "${category.title}"
        )`,
        [],
        (tx, results) => {
          const rows = results.rows;
          let newArr = [];
          for (let i = 0; i < rows.length; i++) {
            newArr.push({
              ...rows.item(i),
            });
          }
          console.log('suuuu', newArr);
          setItems(newArr);
        },
        (err) => {
          console.log(err);
        },
      );
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: getColor(theme, 'primaryBackground'),
    },
  });

  return (
    <ScrollView style={styles.container}>
      {items.map((item: Topic, i) => (
        <ListItem
          key={i}
          secondaryText=""
          icon={true}
          text={item.title}
          onPress={() => {
            navigation.navigate('Questions', {
              screen: 'QuestionsScreen',
              params: {topic: item},
            });
          }}
        />
      ))}
    </ScrollView>
  );
}
