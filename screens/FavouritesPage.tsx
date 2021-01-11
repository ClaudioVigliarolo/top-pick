import * as React from 'react';
import {StyleSheet, Alert, View, ScrollView} from 'react-native';
import {List, Text} from 'native-base';
import Colors from '../constants/Colors';
import ListItemDrag from '../components/list/ListItemDrag';
import DraggableFlatList from 'react-native-draggable-flatlist';
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

interface Question {
  title: string;
  selected: boolean;
  liked: boolean;
}

export default function CategoryList({navigation}: {navigation: any}) {
  const [items, setItems] = React.useState<Question[]>([]);
  const {theme, setTheme} = React.useContext(ThemeContext);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * from questions
        WHERE liked = 1;`,
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

  const onDislike = (title: string) => {
    console.log('callll', title);
    let itemsCopy = [...items];
    const index = items.findIndex((item) => item.title == title);
    console.log(index);
    const newVal = !items[index].liked;
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE "questions"
        SET liked = 1
        WHERE "title" = ${title}`,
        [],
        (tx, results) => {
          console.log('okkkkkk');
          items[index].liked = newVal;
          setItems(itemsCopy.slice());
        },
      );
    });
  };

  const renderItem = ({
    item,
    index,
    drag,
    isActive,
  }: {
    item: Question;
    index: number;
    drag: any;
    isActive: boolean;
  }) => {
    return (
      <ListItemDrag
        onLongPress={drag}
        text={item.title}
        isActive={isActive}
        liked={item.liked}
        onLike={onDislike}
        backgroundColor={Colors[theme].primaryBackground}
        opacity={isActive ? 0.6 : 1}
      />
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors[theme].primaryBackground,
    },
  });
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: Colors[theme].primaryBackground,
      }}>
      <DraggableFlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        onDragEnd={({data}) => setItems(data)}
      />
    </View>
  );
}
