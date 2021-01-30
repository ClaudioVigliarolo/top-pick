import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ThemeContext from '../context/ThemeContext';
import AsyncStorage from '@react-native-community/async-storage';
import SearchBar from '../components/search/SearchBar';
import {getColor} from '../constants/Themes';
import {LocalizationContext} from '../context/LocalizationContext';
import {Topic} from '../interfaces/Interfaces';
import CardItem from '../components/list/CardItem';
import ButtonsSection from '../components/buttons/ButtonsSearchSection';
import data from '../../database/keys/keys';
import SQLite from 'react-native-sqlite-storage';
import {getTranslatedTopic} from '../context/topicTranslator';

const db = SQLite.openDatabase(
  {
    name: 'db.db',
    location: 'default',
    createFromLocation: 1,
  },
  () => {},
  () => {},
);

const MAX_RECENTS = 3;
const MAX_POPULAR = 6;

//!!!! CAMBIA onChangeRecents LOGIC

const SearchPage = ({navigation}: {navigation: any}) => {
  const [text, setText] = React.useState('');
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);
  const [items, setItems] = React.useState<Topic[]>([]);
  const [popular, setPopular] = React.useState<Topic[]>([]);
  const [recents, setRecents] = React.useState<string[]>([]);

  React.useEffect(() => {
    getRecents();
    getPopular();
  }, []);

  const goQuestionsFromTopic = (topic: Topic): void => {
    navigation.navigate('Questions', {
      screen: 'QuestionsScreen',
      params: {topic},
    });
  };

  const getPopular = (): void => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT title from topics${translations.DB_NAME}
        ORDER BY RANDOM()
        LIMIT ${MAX_POPULAR};`,
        [],
        (tx, results) => {
          const rows = results.rows;
          let newArr = [];
          for (let i = 0; i < rows.length; i++) {
            rows.item(i).value = getTranslatedTopic(
              rows.item(i).title,
              translations.DB_NAME,
            );
            newArr.push({
              ...rows.item(i),
            });
          }
          newArr.map(function (item: Topic) {
            return item['title'];
          });
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
      backgroundColor: getColor(theme, 'primaryBackground'),
    },
    buttonsContainer: {
      marginTop: '10%',
    },
  });
  return (
    <React.Fragment>
      <SearchBar
        setText={(val: string) => {
          setText(val);
          executeSearch(val);
        }}
        text={text}
        placeholder={translations.SEARCH_A_TOPIC}
        automatic={true}
      />
      <View>
        {text == '' &&
          recents.map((title: string, i) => (
            <CardItem
              key={i}
              text={title}
              color={getColor(theme, 'primaryOrange')}
              type="topic"
              onPress={() => {
                const topic: Topic = {
                  title,
                  value: getTranslatedTopic(title, translations.DB_NAME),
                };
                goQuestionsFromTopic(topic);
                onChangeRecents(title);
                setText('');
              }}
            />
          ))}
        {text != '' &&
          items.map((item: Topic, i) => (
            <CardItem
              key={i}
              text={item.value}
              color={getColor(theme, 'primaryOrange')}
              type="topic"
              onPress={() => {
                goQuestionsFromTopic(item);
                onChangeRecents(item.value);
                setText('');
              }}
            />
          ))}
      </View>
      <View style={styles.container}>
        <View style={{height: '50%', marginTop: '20%'}}>
          <ButtonsSection
            buttons={popular}
            header={translations.POPULAR_SEARCHES}
            onSearch={(topic: Topic) => {
              goQuestionsFromTopic(topic);
              onChangeRecents(topic.value);
              setText('');
            }}
          />
        </View>
      </View>
    </React.Fragment>
  );
};

export default SearchPage;
