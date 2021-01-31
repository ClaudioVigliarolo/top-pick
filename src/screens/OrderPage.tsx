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
import AddBar from '../components/custom/AddBar';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import SQLite from 'react-native-sqlite-storage';
import EditOverlay from '../components/custom/EditOverlay';

const db = SQLite.openDatabase(
  {
    name: 'db.db',
    location: 'default',
    createFromLocation: 1,
  },
  () => {},
  () => {},
);

const getQuestionHtml = (items: Question[]) => {
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
            ${items
              .map((item: Question) => ' <li>' + item.title + '</li>')
              .join('\n')}
          </ol> 
        </div>
    </body>
  </html>
`;
  return htmlContent;
};

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
  const [questionText, setQuestionText] = React.useState('');
  //id of the question being edited. -1 is the default meaning no question is being edited
  const [questionId, setQuestionId] = React.useState<number>(-1);
  const [items, setItems] = React.useState<Question[]>([]);
  const [isMenuOptionShown, showMenuOption] = React.useState<boolean>(false);
  const [isEditing, setEditing] = React.useState<boolean>(false);
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);
  let actionSheet = React.useRef<HTMLInputElement>();

  React.useEffect(() => {
    setItems(questions);
  }, [questions]);

  const onRemove = (id: number) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id == id);
    if (index != -1) newItems.splice(index, 1);
    setItems(newItems.slice());
  };

  const onEdit = (id: number, newText: string) => {
    setEditing(true);
    setQuestionText(newText);
    setQuestionId(id);
    /* const newItems = [...items];
    const index = newItems.findIndex((item) => item.id == id);
    newItems[index].title = newText;
    setItems(newItems.slice()); */
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
        onEdit={onEdit}
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

  const onEditFinish = (editedQuestion: string, questionId: number) => {
    const newItems = [...items];
    const index = newItems.findIndex((item) => item.id == questionId);
    if (index != -1) {
      newItems[index].title = editedQuestion;
      //update question in db
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE "questions${translations.DB_NAME}"
          SET title = "${editedQuestion}"
          WHERE "id" = ${questionId}`,
          [],
          (tx, results) => {
            setItems(newItems.slice());
          },
          (err) => {
            console.log(err);
          },
        );
      });
    }
  };

  const onQuestionAdd = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO "questions${translations.DB_NAME}"
         VALUES (null, "${topic.title}", "${questionText}", 0)`,
        [],
        (tx, results) => {
          const question_id = results.insertId;
          const newQuestionItem: Question = {
            id: question_id,
            liked: false,
            selected: false,
            title: questionText,
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

  const goPresentation = (): void => {
    navigation.navigate('Presentation', {
      questions: items,
      topic,
    });
  };

  const handleButtons = (functionName: string): void => {
    switch (functionName) {
      case translations.EXPORT_TO_PDF:
        createPDF(getQuestionHtml(items));
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

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'center',
        backgroundColor: getColor(theme, 'primaryBackground'),
      }}>
      <AddBar
        placeholder={translations.ADD_YOUR_QUESTION}
        setText={setQuestionText}
        text={questionText}
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
        text={translations.READY_TO_TALK}
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
      <EditOverlay
        onChangeText={setQuestionText}
        text={questionText}
        onSubmit={() => {
          setEditing(false);
          setQuestionText('');
          onEditFinish(questionText, questionId);
        }}
        onClose={() => {
          setEditing(false);
          setQuestionText('');
        }}
        isVisible={isEditing}
      />
    </View>
  );
}
