import * as React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import ThemeContext from '../context/ThemeContext';
import {List, Text} from 'native-base';
import Colors from '../constants/Colors';
import ListItem from '../components/list/ListItemCheckbox';
import BottomButton from '../components/buttons/BottomButtons';
import SearchBar from '../components/search/SearchBar';
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

let _listViewOffset = 0;

interface Question {
  title: string;
  selected: boolean;
  liked: boolean;
}

export default function QuestionsPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const [items, setItems] = React.useState<Question[]>([]);
  const [filter, setFilter] = React.useState('');
  const [counter, setCounter] = React.useState(0);
  const {theme, setTheme} = React.useContext(ThemeContext);

  const [isActionButtonVisible, setActionButtonVisible] = React.useState(true);

  const {topic} = route.params;
  const mounted: any = React.useRef();

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * from questions
          WHERE topic = "${topic}";`,
        [],
        (tx, results) => {
          const rows = results.rows;

          let newArr = [];
          for (let i = 0; i < rows.length; i++) {
            newArr.push({
              ...rows.item(i),
            });
          }
          newArr.forEach(function (element: Question) {
            element['selected'] = false;
          });
          setItems(newArr);
        },
      );
    });
  }, [topic]);

  const onSubmit = (): void => {
    const newQuestions: Question[] = [];
    items.forEach(function (element: Question) {
      element['selected'] && newQuestions.push(element);
    });
    navigation.navigate('Order', {
      questions: newQuestions,
      topic,
    });
  };

  // 3. Add some logic in the scroll listener for hiding the action button when scrolling down
  const _onScroll = (event: any) => {
    // Simple fade-in / fade-out animation
    const CustomLayoutLinear = {
      duration: 100,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    };
    // Check if the user is scrolling up or down by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction =
      currentOffset > 10 && currentOffset > _listViewOffset ? 'down' : 'up';
    // If the user is scrolling down (and the action-button is still visible) hide it

    const isActionButtonVisible =
      direction === 'up' || event.nativeEvent.contentOffset.y < 10;
    if (isActionButtonVisible) {
      setActionButtonVisible(true);
    } else {
      setActionButtonVisible(false);
    }
    // Update your scroll position
    _listViewOffset = currentOffset;
  };

  const onValChange = (newVal: boolean, index: number): void => {
    let itemsCopy = [...items];
    itemsCopy[index]['selected'] = !itemsCopy[index]['selected'];
    itemsCopy[index]['selected']
      ? setCounter(counter + 1)
      : setCounter(counter - 1);
    setItems(itemsCopy.slice());
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: Colors[theme].primaryBackground,
    },
    counter: {
      textAlign: 'center',
      color: Colors[theme].invertedColor,
      fontWeight: 'bold',
      position: 'absolute',
      top: -50,
      zIndex: 1000,
    },
  });
  {
  }
  return (
    <React.Fragment>
      <SearchBar
        setText={(val: string) => {
          setFilter(val);
        }}
        text={filter}
        placeholder={'Search in ' + topic}
        automatic={false}
      />

      <ScrollView
        style={styles.container}
        onScroll={_onScroll}
        //onScrollEndDrag={() => setActionButtonVisible(true)}
      >
        {items.map((item: Question, i) => {
          if (item.title.toLowerCase().includes(filter.toLowerCase())) {
            // console.log(item);
            return (
              <ListItem
                key={i}
                text={item.title}
                onValChange={(newVal: any) => onValChange(newVal, i)}
                value={item.selected}
              />
            );
          }
        })}
      </ScrollView>
      <View>
        <BottomButton
          onPress={onSubmit}
          text="Next"
          isTextEnabled={true}
          secondaryText={
            counter == 0 ? 'Choose Your Questions' : 'Selected ' + counter
          }
          isButtonEnabled={counter > 0}
          visible={isActionButtonVisible}
        />
      </View>
    </React.Fragment>
  );
}
