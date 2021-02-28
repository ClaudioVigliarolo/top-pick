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
  let _menu = React.useRef(null);
  const {theme} = React.useContext(ThemeContext);
  const [isAlert, setAlert] = React.useState<boolean>(false);

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
      <ListItem
        onPress={() => showMenu()}
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
        <Menu ref={setMenuRef}>
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
              props.onEdit(props.id, props.text);
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
