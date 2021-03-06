import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Category} from '../interfaces/Interfaces';
import {getColor} from '../constants/Themes';
import ThemeContext from '../context/ThemeContext';
import {LocalizationContext} from '../context/LocalizationContext';
import ListItem from '../components/list/ListItem';
import {getDB} from '../utils/utils';

export default function CategoryList({navigation}: {navigation: any}) {
  const [items, setItems] = React.useState<Category[]>([]);
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);

  React.useEffect(() => {
    getDB().transaction((tx) => {
      tx.executeSql(
        `SELECT category as title, count(*) as counter
        from category_topics${translations.DB_NAME}
        GROUP BY category;`,
        [],
        (tx, results) => {
          const rows = results.rows;
          console.log('MYRESS', rows);
          let newArr = [];

          for (let i = 0; i < rows.length; i++) {
            newArr.push({
              ...rows.item(i),
            });
          }
          console.log('tuttttt', newArr);

          setItems([...newArr]);
        },
      );
    });
  }, [translations.DB_NAME]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: getColor(theme, 'primaryBackground'),
    },
  });
  return (
    <ScrollView style={styles.container}>
      {items.map((item: Category, i) => (
        <ListItem
          key={i}
          icon={true}
          secondaryText={item.counter}
          text={item.title}
          onPress={() =>
            navigation.navigate('Topics', {
              category: item,
            })
          }
        />
      ))}
    </ScrollView>
  );
}
