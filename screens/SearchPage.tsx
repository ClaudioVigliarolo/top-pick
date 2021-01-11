import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ThemeContext from '../context/ThemeContext';
import AsyncStorage from '@react-native-community/async-storage';
import SearchBar from '../components/search/SearchBar';
import Colors from '../constants/Colors';
import Dimensions from '../constants/Dimensions';
import CardItem from '../components/list/CardItem';
import ButtonsSection from '../components/buttons/ButtonsSearchSection';
import data from '../database/keys';
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

const MAX_RECENTS = 3;
const MAX_POPULAR = 6;

//!!!! CAMBIA onChangeRecents LOGIC

const SearchPage = ({navigation}: {navigation: any}) => {
  const [text, setText] = React.useState('');
  const {theme, setTheme} = React.useContext(ThemeContext);
  const [items, setItems] = React.useState<Topic[]>([]);
  const [popular, setPopular] = React.useState<Topic[]>([]);
  const [recents, setRecents] = React.useState<string[]>([]);

  React.useEffect(() => {
    getRecents();
    getPopular();
  }, []);

  const goQuestionsFromTopic = (topic: string): void => {
    console.log('!!', topic);
    navigation.navigate('Questions', {
      screen: 'QuestionsScreen',
      params: {topic},
    });
  };

  const getPopular = (): void => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT title from topics
        ORDER BY RANDOM()
        LIMIT ${MAX_POPULAR};`,
        [],
        (tx, results) => {
          const rows = results.rows;
          let newArr = [];
          for (let i = 0; i < rows.length; i++) {
            newArr.push({
              ...rows.item(i),
            });
          }
          newArr.map(function (item: Topic) {
            return item['title'];
          });
          console.log('Nnnn', newArr);
          setPopular(newArr);
        },
      );
    });
  };

  const onChangeRecents = async (newSearch: string) => {
    //check if contained, if so don't insert and put it to front
    if (recents.includes(newSearch)) {
      let newArray: string[] = [];
      newArray.push(newSearch);
      recents.forEach((el) => {
        if (el != newSearch) {
          newArray.push(el);
        }
        setRecents(newArray);
      });
    } else if (recents.length < MAX_RECENTS) {
      //push back
      recents.push(newSearch);
    } else {
      let temp: string[] = [];
      temp.push(newSearch);
      let oldArray = recents.slice(0, 2);
      const newArray = temp.concat(oldArray);
      setRecents(newArray);
    }
    saveRecents();
  };

  const saveRecents = async () => {
    try {
      await AsyncStorage.setItem(
        data.RECENT_SEARCH_KEY,
        JSON.stringify(recents),
      );
    } catch (error) {
      // Error saving data
    }
  };

  const getRecents = async () => {
    try {
      const myArray = await AsyncStorage.getItem(data.RECENT_SEARCH_KEY);
      if (myArray !== null) {
        // We have data!!
        console.log('RETRIEVING', JSON.parse(myArray));
        setRecents(JSON.parse(myArray));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const executeSearch = (param: string): void => {
    if (param == '') {
      setItems([]);
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT title from topics
        WHERE title LIKE "%${param}%"
        LIMIT 3;`,
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
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      //  alignItems:'flex-start'
      // flexDirection:'column',
      backgroundColor: Colors[theme].primaryBackground,
    },
    buttonsContainer: {
      marginTop: '10%',
    },
  });
  {
    console.log('ree', recents);
  }
  return (
    <React.Fragment>
      <SearchBar
        setText={(val: string) => {
          setText(val);
          executeSearch(val);
        }}
        text={text}
        placeholder="Search a topic"
        automatic={true}
      />
      <View>
        {text == '' &&
          recents.map((title: string, i) => (
            <CardItem
              key={i}
              text={title}
              color={Colors[theme].primaryOrange}
              type="topic"
              onPress={() => {
                goQuestionsFromTopic(title);
                onChangeRecents(title);
                setText('');
              }}
            />
          ))}
        {text != '' &&
          items.map((item: Topic, i) => (
            <CardItem
              key={i}
              text={item.title}
              color={Colors[theme].primaryOrange}
              type="topic"
              onPress={() => {
                goQuestionsFromTopic(item.title);
                onChangeRecents(item.title);
                setText('');
              }}
            />
          ))}
      </View>
      <View style={styles.container}>
        <View style={{height: '50%', marginTop: '20%'}}>
          <ButtonsSection
            buttons={popular}
            header="Popular Searches"
            onSearch={(topic: Topic) => {
              goQuestionsFromTopic(topic.title);
              onChangeRecents(topic.title);
              setText('');
            }}
          />
        </View>
      </View>
    </React.Fragment>
  );
};

export default SearchPage;
