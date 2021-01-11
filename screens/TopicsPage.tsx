import * as React from 'react';
import {StyleSheet, Alert, ScrollView} from 'react-native';
import {List, Text} from 'native-base';
import ThemeContext from '../context/ThemeContext';
import Colors from '../constants/Colors';
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

interface Topic {
  title: string;
}

export default function TopicsPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {theme, setTheme} = React.useContext(ThemeContext);
  const [items, setItems] = React.useState<Topic[]>([]);
  const {category} = route.params;

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT t.title
        FROM topics t
        WHERE t.title IN(
            SELECT c.topic
            FROM category_topics c
            WHERE c.category = "${category}"
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
          setItems(newArr);
        },
      );
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors[theme].primaryBackground,
    },
  });

  return (
    <ScrollView style={styles.container}>
      {items.map((item: Topic, i) => (
        <ListItem
          key={i}
          text={item.title}
          onPress={() => {
            const topic = item.title;
            navigation.navigate('Questions', {
              screen: 'QuestionsScreen',
              params: {topic},
            });
          }}
        />
      ))}
    </ScrollView>
  );
}
