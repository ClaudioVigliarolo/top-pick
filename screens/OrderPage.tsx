import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import Colors from '../constants/Colors';
import BottomButton from '../components/buttons/BottomButtons';
import Dimensions from '../constants/Dimensions';
import ThemeContext from '../context/ThemeContext';
import ListItemDrag from '../components/list/ListItemDrag';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ButtonsModal from '../components/buttons/ButtonsModal';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
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

interface Data {
  key: number;
  id: number;
  name: string;
  function: string;
}

export default function OrderPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {
    questions,
    topic,
  }: {questions: Question[]; topic: string} = route.params;
  const [items, setItems] = React.useState<Question[]>([]);
  const [isMenuOptionShown, showMenuOption] = React.useState<boolean>(false);
  const {theme, setTheme} = React.useContext(ThemeContext);
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
        onLike={onLike}
        backgroundColor={Colors[theme].primaryBackground}
        opacity={isActive ? 0.6 : 1}
      />
    );
  };

  const createPDF = async (html: any) => {
    let options = {
      html: html,
      fileName: topic,
      directory: 'Documents/Topics',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file);
  };

  const onLike = (title: string) => {
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

  const ButtonsModalData: Data[] = [
    {
      key: 0,
      id: 0,
      name: 'Export to PDF',
      function: 'exportToPdf',
    },
    {
      key: 1,
      id: 1,
      name: 'Start Presentation',
      function: 'goPresentation',
    },
  ];

  React.useEffect(() => {
    setItems(questions);
  }, [questions]); // Only re-run the effect if count changes

  const goPresentation = (): void => {
    navigation.navigate('Presentation', {
      questions: questions,
      topic,
    });
  };

  const handleButtons = (functionName: string): void => {
    switch (functionName) {
      case 'exportToPdf':
        createPDF(htmlContent);
        break;

      case 'goPresentation':
        goPresentation();
        break;

      default:
        break;
    }
  };

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: black;
            }
            h3 {
                text-align: center;
              font-weight:fold;
            }
            li{
                padding:8px;
            }
        </style>
    </head>
    <body>
        <h3>Topic Title</h3>
        <div style="margin-top:50px">
          <ol>
            ${questions.map((question) => '<li>' + question.title + '</li>')}
          </ol> 
        </div>
    </body>
  </html>
`;
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
        onDragEnd={({items}) => setItems(items)}
      />
      {/*showMenuOption(true)*/}
      <BottomButton
        onPress={() => showMenuOption(true)}
        text="I'm Ready! "
        isButtonEnabled={true}
        isTextEnabled={false}
        visible={true}
      />
      <ButtonsModal
        data={ButtonsModalData}
        isActive={isMenuOptionShown}
        backgroundColor={Colors[theme].primaryBackground}
        color={Colors[theme].primaryOrange}
        onPress={(functionName: string) => {
          showMenuOption(false);
          handleButtons(functionName);
        }}
        title="Now Is The Time"
        onHide={() => showMenuOption(false)}
      />
    </View>
  );
}
