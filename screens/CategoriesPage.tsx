import * as React from 'react';
import {StyleSheet, Alert, ScrollView} from 'react-native';
import {List, Text} from 'native-base';
import Colors from '../constants/Colors';
import ThemeContext from '../context/ThemeContext';
import Dimensions from '../constants/Dimensions';
import ListItem from '../components/list/ListItem';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'db.db',
    location: 'default',
    createFromLocation: 1,
  },
  () => {},
  () => {},
);

interface Category {
  title: string;
  counter: number;
}

export default function CategoryList({navigation}: {navigation: any}) {
  const [items, setItems] = React.useState<Category[]>([]);
  const {theme, setTheme} = React.useContext(ThemeContext);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT category as title, count(*) as counter
        from category_topics
        GROUP BY category;`,
        [],
        (tx, results) => {
          const rows = results.rows;
          let newArr = [];
          for (let i = 0; i < rows.length; i++) {
            newArr.push({
              ...rows.item(i),
            });
          }
          setItems([...newArr]);
        },
      );
    });
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors[theme].primaryBackground,
    },
  });
  return (
    <ScrollView style={styles.container}>
      {items.map((item: Category, i) => (
        <ListItem
          key={i}
          secondaryText={item.counter}
          text={item.title}
          onPress={() =>
            navigation.navigate('Topics', {
              category: item.title,
            })
          }
        />
      ))}
    </ScrollView>
  );
}
