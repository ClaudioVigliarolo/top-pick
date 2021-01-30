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
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {View, StyleSheet, TouchableWithoutFeedback, Alert} from 'react-native';
import {getColor} from '../../constants/Themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeIcon from 'react-native-vector-icons/AntDesign';

import Dimensions from '../../constants/Dimensions';
import {TextInput} from 'react-native-gesture-handler';

interface CustomListItemProps {
  id: number;
  text: string;
  backgroundColor: string;
  isActive: boolean;
  liked: boolean;
  opacity: number;
  onDrag(): void;
  onLike(id: number): void;
  onRemove(id: number): void;
  onChangeText(text: string, id: number): void;
  number: number;
}

const CustomListItem = (props: CustomListItemProps) => {
  let _menu = React.useRef(null);
  const {theme} = React.useContext(ThemeContext);
  const [isEditing, setEdit] = React.useState<boolean>(false);

  const setMenuRef = (ref: any) => {
    _menu = ref;
  };

  const hideMenu = () => {
    _menu.hide();
  };

  const showMenu = () => {
    _menu.show();
  };

  return (
    <View>
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
        <Menu
          ref={setMenuRef}
          button={<Text onPress={showMenu}>Show menu</Text>}>
          <MenuItem
            onPress={() => {
              hideMenu();
              Clipboard.setString(props.text);
            }}>
            Copy
          </MenuItem>
          <MenuItem
            onPress={() => {
              hideMenu();
              setEdit(true);
            }}>
            Edit
          </MenuItem>
          <MenuItem
            onPress={() => {
              hideMenu();
              props.onRemove(props.id);
            }}>
            Remove
          </MenuItem>
        </Menu>
      </View>
      <ListItem
        onLongPress={() => showMenu()}
        noIndent={true}
        noBorder={true}
        style={[
          styles.container,
          {backgroundColor: props.backgroundColor, opacity: props.opacity},
        ]}>
        {!isEditing && (
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
        )}

        <View style={styles.textContainer}>
          {!isEditing && (
            <Text
              style={{
                color: getColor(theme, 'primaryText'),
                textAlignVertical: 'center',
                textAlign: 'left',
              }}>
              {props.text.replace(/^\s+/g, '')}
            </Text>
          )}

          {isEditing && (
            <View style={styles.overlay}>
              <TextInput
                style={styles.editing}
                multiline={true}
                value={props.text}
                onChangeText={(text) => props.onChangeText(text, props.id)}
              />
            </View>
          )}
        </View>

        {!isEditing && (
          <View style={styles.iconContainer}>
            <LikeIcon
              name={props.liked ? 'heart' : 'hearto'}
              color={getColor(theme, 'primaryOrange')}
              size={Dimensions.iconMedSmall}
              onPress={() => props.onLike(props.id)}
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
        )}
      </ListItem>
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
    height: '100%',
    padding: 0,
  },
  numberContainer: {
    margin: 5,
    marginLeft: 0,
    flex: 1,

    alignItems: 'center',
  },
  numberText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 2,
  },
  editing: {
    width: '100%',
    textAlignVertical: 'center',
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
  },
});
