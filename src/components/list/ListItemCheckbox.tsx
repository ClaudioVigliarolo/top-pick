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

interface ListItemCheckBoxProps {
  text: string;
  value: boolean;
  onPress?(): void;
  onValChange: any;
}

const ListItemCheckBox = (props: ListItemCheckBoxProps) => {
  const {theme} = React.useContext(ThemeContext);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
          }}>
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
            <TouchableOpacity style={styles.modalItem}>
              <Text style={styles.modalText}>{translations.REPORT}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={toggleModal}>
              <Text style={styles.modalText}>{translations.CLOSE}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
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
    width: Dimensions.MODAL_WIDTH,
  },
  modalText: {
    alignSelf: 'baseline',
    fontWeight: '100',
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
