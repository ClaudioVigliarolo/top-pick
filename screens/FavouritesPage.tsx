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
  id: number;
  title: string;
  selected: boolean;
  liked: boolean;
}

export default function CategoryList({navigation}: {navigation: any}) {
  const [items, setItems] = React.useState<Question[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const {theme, setTheme} = React.useContext(ThemeContext);
  React.useEffect(() => {
    getItems();
  }, [items.length]); // Only re-run the effect if count changes

  const getItems = () => {
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
          setLoading(false);
        },
      );
    });
  };

  const onDislike = (id: number) => {
    console.log('idddd', id);
    const index = items.findIndex((item) => item.id == id);
    const newVal = !items[index].liked;
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE "questions"
        SET liked = ${newVal ? 1 : 0}
        WHERE "id" = ${id}`,
        [],
        (tx, results) => {
          getItems();
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
        id={item.id}
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

    text: {
      color: Colors[theme].primaryOrange,
      textAlign: 'center',
      fontSize: Dimensions.fontMed,
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
      {!isLoading && items.length == 0 && (
        <Text style={styles.text}>No Liked Questions</Text>
      )}
      {items.length > 0 && (
        <DraggableFlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          onDragEnd={({data}) => setItems(data)}
        />
      )}
    </View>
  );
}
