import * as React from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Right,
} from 'native-base';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import {getColor} from '../../constants/Themes';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-community/clipboard';
import Dimensions from '../../constants/Dimensions';
import translations from '../../context/translations';
import {addReport} from '../../utils/api';
import {Report} from '../../interfaces/Interfaces';
import {TextInput} from 'react-native-gesture-handler';

interface ListItemCheckBoxProps {
  text: string;
  value: boolean;
  onPress?(): void;
  onValChange: any;
  id: number;
  topic: string;
}

const ListItemCheckBox = (props: ListItemCheckBoxProps) => {
  const {theme} = React.useContext(ThemeContext);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isModalReportOn, setModalReportOn] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onReport = async (reason: string, id: number, topic: string) => {
    toggleModal();
    const newReport: Report = {
      id,
      reason,
      topic,
    };
    console.log(newReport, await addReport(newReport, translations.DB_NAME));
  };
  {
    console.log('text of question', props.text, '  id:', props.id);
  }
  return (
    <ListItem style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.textContainer}>
          <Text
            style={{
              color: getColor(theme, 'primaryText'),
              fontSize: Dimensions.fontList,
            }}>
            {props.text.replace(/\s+/g, ' ').trim()}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <Right style={{position: 'absolute', right: '10%'}}>
        <CheckBox
          disabled={false}
          tintColors={{
            true: getColor(theme, 'primaryOrange'),
            false: getColor(theme, 'lightGray'),
          }}
          value={props.value}
          onValueChange={(newValue: boolean) => props.onValChange(newValue)}
        />
      </Right>
      <Modal isVisible={isModalVisible}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
            setModalReportOn(false);
          }}>
          {!isModalReportOn && (
            <TouchableOpacity style={styles.modalItemContainer}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  toggleModal();
                  Clipboard.setString(props.text);
                }}>
                <Text style={styles.modalText}>{translations.COPY}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  toggleModal();
                  props.onValChange(!props.value);
                }}>
                <Text style={styles.modalText}>
                  {props.value ? translations.DESELECT : translations.SELECT}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setModalReportOn(true);
                }}>
                <Text style={styles.modalText}>{translations.REPORT}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalItem} onPress={toggleModal}>
                <Text style={styles.modalText}>{translations.CLOSE}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}

          {isModalReportOn && (
            <TouchableOpacity style={styles.modalItemContainer}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  toggleModal();
                  onReport(
                    translations.REASON_TRANSLATION,
                    props.id,
                    props.topic,
                  );
                }}>
                <Text style={styles.modalText}>
                  {translations.REASON_TRANSLATION}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  toggleModal();
                  onReport(
                    translations.REASON_PERTINENCE,
                    props.id,
                    props.topic,
                  );
                }}>
                <Text style={styles.modalText}>
                  {translations.REASON_PERTINENCE}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  toggleModal();
                  onReport(
                    translations.REASON_SCURRILOUS,
                    props.id,
                    props.topic,
                  );
                }}>
                <Text style={styles.modalText}>
                  {translations.REASON_SCURRILOUS}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  toggleModal();
                  onReport(translations.REASON_OTHERS, props.id, props.topic);
                }}>
                <Text style={styles.modalText}>
                  {translations.REASON_OTHERS}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Modal>
    </ListItem>
  );
};

export default ListItemCheckBox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  modalItem: {
    justifyContent: 'flex-start',
    padding: 10,
    paddingLeft: 20,
  },
  modalItemContainer: {
    backgroundColor: 'white',
    borderRadius: 2,
    alignSelf: 'center',
    opacity: 0.9,
    padding: 2,
    width: Dimensions.MODAL_WIDTH,
  },
  modalText: {
    alignSelf: 'baseline',
    textTransform: 'capitalize',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },

  textContainer: {
    maxWidth: '82%',
  },
});
