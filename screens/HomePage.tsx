import * as React from 'react';
import {View, SafeAreaView, Alert} from 'react-native';
import ThemeContext from '../context/ThemeContext';
import TopicsCarousel from '../components/custom/CustomCarousel';
import Button from '../components/buttons/CustomButton';
import {Text} from 'native-base';
import Colors from '../constants/Colors';
import Dimensions from '../constants/Dimensions';
import SQLite from 'react-native-sqlite-storage';

interface Topic {
  title: string;
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

const INITIALS_TOPICS_LOADED = 10;
const NEW_TOPICS_LOADED = 10;

const HomePage = ({navigation}: {navigation: any}) => {
  const mycarousel = React.useRef(null);
  const [topic, setTopic] = React.useState('');
  const [carouselItems, setCarouselItems] = React.useState<Topic[]>([]);
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const {theme, setTheme} = React.useContext(ThemeContext);

  React.useEffect(() => {
    loadTopics(INITIALS_TOPICS_LOADED);
  }, []);

  const loadTopics = (n: number): void => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT title from topics
        ORDER BY RANDOM()
        LIMIT ${n};`,
        [],
        (tx, results) => {
          const rows = results.rows;
          let newArr = carouselItems;
          for (let i = 0; i < rows.length; i++) {
            newArr.push({
              ...rows.item(i),
            });
          }
          console.log(newArr);
          setCarouselItems([...newArr]);
        },
      );
    });
  };

  const getNewTopics = (n: number): void => {
    if (carouselItems.length == n + 1) {
      loadTopics(NEW_TOPICS_LOADED);
    }
  };

  const goQuestionsPage = (topic: string): void => {
    navigation.navigate('Questions', {
      screen: 'QuestionsScreen',
      params: {topic},
    });
  };
  {
    console.log(mycarousel.current);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors[theme].primaryBackground,
      }}>
      <View
        style={{
          flex: 6,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <TopicsCarousel
          setIndex={(index: number) => {
            setCarouselIndex(index);
            getNewTopics(index);
          }}
          onTopicPress={(topic: string) => goQuestionsPage(topic)}
          activeIndex={carouselIndex}
          ref={mycarousel}
          carouselItems={carouselItems}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          width: '100%',
          marginBottom: Dimensions.tabHeight,
          justifyContent: 'center',
        }}>
        <Button
          color={Colors[theme].primaryOrange}
          title="Pick A Topic"
          onPress={() => {
            mycarousel.current && mycarousel.current.getCarousel().snapToNext();
            getNewTopics(carouselIndex + 1);
            setCarouselIndex(carouselIndex + 1);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
