import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ThemeContext from '../context/ThemeContext';
import AsyncStorage from '@react-native-community/async-storage';
import SearchBar from '../components/search/SearchBar';
import {getColor} from '../constants/Themes';
import {LocalizationContext} from '../context/LocalizationContext';
import {Topic, Topics} from '../interfaces/Interfaces';
import CardItem from '../components/list/CardItem';
import ButtonsSection from '../components/buttons/ButtonsSearchSection';
import data from '../../database/keys/keys';
import SQLite from 'react-native-sqlite-storage';
import {getTranslatedTopic, getCurrentTopics} from '../context/topicTranslator';

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

  const currentTopics = getCurrentTopics(translations.DB_NAME);

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
    console.log('on cchhh recents', newSearch);
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
        const retrievedTopics = JSON.parse(myArray);
        retrievedTopics.filter((topic: string) =>
          getTranslatedTopic(topic, translations.DB_NAME),
        );
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
    const titleList: string[] = Object.keys(currentTopics).filter(function (
      e,
      key,
    ) {
      return currentTopics[e].includes(param.toLowerCase());
    });

    const newTopics = titleList.slice(0, MAX_RECENTS).map((title) => {
      const topic: Topic = {
        title,
        value: currentTopics[title],
      };
      return topic;
    });
    setItems(newTopics);
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
              text={getTranslatedTopic(title, translations.DB_NAME)}
              color={getColor(theme, 'primaryOrange')}
              type="topic"
              onPress={() => {
                const topic: Topic = {
                  title,
                  value: getTranslatedTopic(title, translations.DB_NAME),
                };
                console.log('7777777', topic);
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
