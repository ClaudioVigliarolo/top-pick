import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {Question, Topic} from '../interfaces/Interfaces';
import {getColor} from '../constants/Themes';
import {LocalizationContext} from '../context/LocalizationContext';
import FileViewer from 'react-native-file-viewer';
import BottomButton from '../components/buttons/BottomButtons';
import Dimensions from '../constants/Dimensions';
import ThemeContext from '../context/ThemeContext';
import ListItemDrag from '../components/list/ListItemDrag';
import DraggableFlatList from 'react-native-draggable-flatlist';
import BottomsDownToUp from '../components/buttons/BottomsDownToUp';
import AddSection from '../components/custom/AddSection';
import AddBar from '../components/custom/AddBar';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import SQLite from 'react-native-sqlite-storage';

const MIN_QUESTION_LEN = 5;
const db = SQLite.openDatabase(
  {
    name: 'db.db',
    location: 'default',
    createFromLocation: 1,
  },
  () => {},
  () => {},
);

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
  }: {questions: Question[]; topic: Topic} = route.params;
  const [newQuestion, setNewQuestion] = React.useState('');
  const [items, setItems] = React.useState<Question[]>([]);
  const [isMenuOptionShown, showMenuOption] = React.useState<boolean>(false);
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);
  let actionSheet = React.useRef<HTMLInputElement>();

  const onRemove = (id: number) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id == id);
    if (index != -1) newItems.splice(index, 1);
    setItems(newItems.slice());
  };

  const onChangeTextListItem = (id: number, newText: string) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id == id);
    newItems[index].title = newText;
    setItems(newItems.slice());
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
        onChangeText={onChangeTextListItem}
        onRemove={onRemove}
        onDrag={drag}
        number={index + 1}
        text={item.title}
        isActive={isActive}
        liked={item.liked}
        onLike={onLike}
        id={item.id}
        backgroundColor={getColor(theme, 'primaryBackground')}
        opacity={isActive ? 0.7 : 1}
      />
    );
  };

  const onQuestionAdd = () => {
    if (newQuestion.length < MIN_QUESTION_LEN) return false;
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO "questions${translations.DB_NAME}"
         VALUES (null, "${topic.title}", "${newQuestion}", 0)`,
        [],
        (tx, results) => {
          const question_id = results.insertId;
          const newQuestionItem: Question = {
            id: question_id,
            liked: false,
            selected: false,
            title: newQuestion,
          };
          console.log(newQuestionItem);
          const newArray = [newQuestionItem].concat(items);
          setItems(newArray.slice());
        },
        (err) => {
          console.log(err);
        },
      );
    });
  };

  const createPDF = async (htmlContent: string) => {
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: htmlContent,
        //File Name
        fileName: topic.value,
        //File directory
        directory: 'Top Picks',
      };
      let file = await RNHTMLtoPDF.convert(options);
      const path = FileViewer.open(file.filePath)
        .then(() => {})
        .catch((error) => {
          console.log('error opening');
        });
    }
  };

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const onLike = (id: number) => {
    let itemsCopy = [...items];
    const index = items.findIndex((item) => item.id == id);
    const newVal = !items[index].liked;
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE "questions${translations.DB_NAME}"
        SET liked = ${newVal ? 1 : 0}
        WHERE "id" = ${id}`,
        [],
        (tx, results) => {
          items[index].liked = newVal;
          setItems(itemsCopy.slice());
        },
        (err) => {
          console.log(err);
        },
      );
    });
  };

  const BottomsDownToUpData: string[] = [
    translations.EXPORT_TO_PDF,
    translations.START_PRESENTATION,
    translations.CLOSE,
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
      case translations.EXPORT_TO_PDF:
        createPDF(htmlContent);
        break;

      case translations.START_PRESENTATION:
        goPresentation();
        break;
      case translations.CLOSE:
        actionSheet.current.hide();
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
            ${questions
              .map((question) => ' <li>' + question.title + '</li>')
              .join('\n')}
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
        backgroundColor: getColor(theme, 'primaryBackground'),
      }}>
      <AddBar
        placeholder={translations.ADD_YOUR_QUESTION}
        setText={setNewQuestion}
        text={newQuestion}
        onAdd={onQuestionAdd}
      />
      <DraggableFlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        onDragEnd={({data}) => setItems(data)}
      />
      {/*showMenuOption(true)*/}
      <BottomButton
        onPress={() => {
          actionSheet.current.show();
        }}
        text={translations.READY}
        isButtonEnabled={true}
        isTextEnabled={false}
        visible={true}
      />
      <BottomsDownToUp
        data={BottomsDownToUpData}
        isActive={isMenuOptionShown}
        actionSheet={actionSheet}
        backgroundColor={getColor(theme, 'primaryBackground')}
        color={getColor(theme, 'primaryOrange')}
        onPress={(functionName: string) => {
          showMenuOption(false);
          handleButtons(functionName);
        }}
        title={translations.IS_TIME}
        onHide={() => actionSheet.current.hide()}
      />
    </View>
  );
}
