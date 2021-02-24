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
import keys from '../../database/keys/keys';
import SQLite from 'react-native-sqlite-storage';

interface Recent {
  topic: string;
  language: any;
}

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
  }, [translations.DB_NAME]);

  const goQuestionsFromTopic = (topic: Topic): void => {
    navigation.navigate('Questions', {
      screen: 'QuestionsScreen',
      params: {topic},
    });
  };

  const getPopular = (): void => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * from topics${translations.DB_NAME}
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
          setPopular(newArr);
        },
      );
    });
  };

  const onChangeRecents = async (newSearch: string) => {
    console.log('on cchhh recents', newSearch);
    let newRecents: string[] = [];
    //check if contained, if so don't insert and put it to front
    if (recents.includes(newSearch)) {
      recents.push(newSearch);
      recents.forEach((el) => {
        if (el != newSearch) {
          newRecents.push(el);
        }
        newRecents = recents;
      });
    } else if (recents.length < MAX_RECENTS) {
      //push back
      recents.push(newSearch);
      newRecents = [...recents];
    } else {
      let temp: string[] = [];
      temp.push(newSearch);
      let oldArray = recents.slice(0, 2);
      newRecents = temp.concat(oldArray);
    }
    setRecents(newRecents);
    saveRecents(newRecents);
  };

  const saveRecents = async (newRecents: string[]) => {
    //create recents array
    const newRecentsArray: Recent[] = newRecents.map((topic: string) => {
      const item: Recent = {topic, language: translations.DB_NAME};
      return item;
    });
    try {
      await AsyncStorage.setItem(
        keys.RECENT_SEARCH_KEY + translations.DB_NAME,
        JSON.stringify(newRecentsArray),
      );
    } catch (error) {
      // Error saving data
    }
  };

  const getRecents = async () => {
    try {
      const retrievedArray = await AsyncStorage.getItem(
        keys.RECENT_SEARCH_KEY + translations.DB_NAME,
      );
      if (retrievedArray !== null) {
        // We have data!!
        const recentsArray: string[] = JSON.parse(retrievedArray).map(
          (el: Recent) => {
            if (el.language == translations.DB_NAME) return el.topic;
          },
        );
        const recents = recentsArray.filter((el) => el);
        setRecents(recents);
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
        `SELECT * from topics${translations.DB_NAME}
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
                  source: '',
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
              text={item.title}
              color={getColor(theme, 'primaryOrange')}
              type="topic"
              onPress={() => {
                goQuestionsFromTopic(item);
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
            header={translations.POPULAR_SEARCHES}
            onSearch={(topic: Topic) => {
              goQuestionsFromTopic(topic);
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
