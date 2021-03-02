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
import Clipboard from '@react-native-community/clipboard';
import ThemeContext from '../../context/ThemeContext';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {getColor} from '../../constants/Themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import Dimensions from '../../constants/Dimensions';
import Modal from 'react-native-modal';
import translations from '../../context/translations';

interface CustomListItemProps {
  id: number;
  text: string;
  backgroundColor: string;
  isActive: boolean;
  liked: boolean | undefined;
  opacity: number;
  onDrag?(): void;
  onToggleLike(id: number): void;
  onRemove(id: number): void;
  onEdit?(id: number, text: string): void;
  number?: number;
}

const CustomListItem = (props: CustomListItemProps) => {
  const {theme} = React.useContext(ThemeContext);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <ListItem
        onPress={toggleModal}
        noIndent={true}
        noBorder={true}
        style={[
          styles.container,
          {backgroundColor: props.backgroundColor, opacity: props.opacity},
        ]}>
        <View style={styles.numberContainer}>
          <Text
            style={{
              color: getColor(theme, 'primaryText'),
              textAlignVertical: 'center',
              fontWeight: 'bold',
            }}>
            {props.number}
          </Text>
        </View>

        <View style={styles.textContainer}>
          <Text
            style={{
              color: getColor(theme, 'primaryText'),
              textAlignVertical: 'center',
              marginRight: 'auto',
            }}>
            {props.text.replace(/^\s+/g, '')}
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <LikeIcon
            name={props.liked ? 'heart' : 'hearto'}
            color={getColor(theme, 'primaryOrange')}
            size={Dimensions.iconMedSmall}
            onPress={() => props.onToggleLike(props.id)}
            style={{marginRight: 5}}
          />
          <TouchableWithoutFeedback onPressIn={props.onDrag}>
            <Icon
              name="drag"
              color={getColor(theme, 'lightGray')}
              size={Dimensions.iconMed}
            />
          </TouchableWithoutFeedback>
        </View>
      </ListItem>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
                  props.onEdit && props.onEdit(props.id, props.text);
                }}>
                <Text style={styles.modalText}>{translations.EDIT}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  toggleModal();
                  props.onToggleLike(props.id);
                }}>
                <Text style={styles.modalText}>
                  {props.liked
                    ? translations.REMOVE_FAVOURITE
                    : translations.ADD_FAVOURITE}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  toggleModal();
                  props.onRemove(props.id);
                }}>
                <Text style={styles.modalText}>{translations.REMOVE}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalItem} onPress={toggleModal}>
                <Text style={styles.modalText}>{translations.CLOSE}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 9,
    flexDirection: 'row',
    height: '100%',
    padding: 0,
    textAlign: 'left',
  },
  numberContainer: {
    margin: 0,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginLeft: -15,
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 2,
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
});
