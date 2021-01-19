import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Colors from '../constants/Colors';
import FileViewer from 'react-native-file-viewer';
import BottomButton from '../components/buttons/BottomButtons';
import Dimensions from '../constants/Dimensions';
import ThemeContext from '../context/ThemeContext';
import ListItemDrag from '../components/list/ListItemDrag';
import DraggableFlatList from 'react-native-draggable-flatlist';
import BottomsDownToUp from '../components/buttons/BottomsDownToUp';

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
  id: number;
  title: string;
  selected: boolean;
  liked: boolean;
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
  let actionSheet = React.useRef<HTMLInputElement>();
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
        onDrag={drag}
        number={index + 1}
        text={item.title}
        isActive={isActive}
        liked={item.liked}
        onLike={onLike}
        id={item.id}
        backgroundColor={Colors[theme].primaryBackground}
        opacity={isActive ? 0.7 : 1}
      />
    );
  };

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };

  const createPDF = async (htmlContent: string) => {
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: htmlContent,
        //File Name
        fileName: topic,
        //File directory
        directory: 'Top Picks',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      const path = FileViewer.open(file.filePath)
        .then(() => {
          console.log('ok open');
        })
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
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        Alert.alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const onLike = (id: number) => {
    let itemsCopy = [...items];
    const index = items.findIndex((item) => item.id == id);
    console.log(index);
    const newVal = !items[index].liked;
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE "questions"
        SET liked = ${newVal ? 1 : 0}
        WHERE "id" = ${id}`,
        [],
        (tx, results) => {
          console.log('okkkkkk');
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
    'Export to PDF',
    'Start Presentation',
    'Close',
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
      case 'Export to PDF':
        createPDF(htmlContent);
        break;

      case 'Start Presentation':
        goPresentation();
        break;
      case 'Close':
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
            ${questions.map((question) => '<li>' + question.title + '</li>')}
          </ol> 
        </div>
    </body>
  </html>
`;

  {
    console.log('mmmaa', items);
  }
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
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        onDragEnd={({data}) => setItems(data)}
      />
      {/*showMenuOption(true)*/}
      <BottomButton
        onPress={() => {
          actionSheet.current.show();
        }}
        text="I'm Ready! "
        isButtonEnabled={true}
        isTextEnabled={false}
        visible={true}
      />
      <BottomsDownToUp
        data={BottomsDownToUpData}
        isActive={isMenuOptionShown}
        actionSheet={actionSheet}
        backgroundColor={Colors[theme].primaryBackground}
        color={Colors[theme].primaryOrange}
        onPress={(functionName: string) => {
          showMenuOption(false);
          handleButtons(functionName);
        }}
        title="Now Is The Time"
        onHide={() => actionSheet.current.hide()}
      />
    </View>
  );
}
