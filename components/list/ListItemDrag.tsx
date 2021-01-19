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
import ThemeContext from '../../context/ThemeContext';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeIcon from 'react-native-vector-icons/AntDesign';

import Dimensions from '../../constants/Dimensions';

interface CustomListItemProps {
  id: number;
  text: string;
  backgroundColor: string;
  isActive: boolean;
  liked: boolean;
  opacity: number;
  onDrag(): void;
  onLike(id: number): void;
  number: number;
}

const CustomListItem = (props: CustomListItemProps) => {
  const {theme, setTheme} = React.useContext(ThemeContext);

  return (
    <ListItem
      noIndent={true}
      noBorder={true}
      style={[
        styles.container,
        {backgroundColor: props.backgroundColor, opacity: props.opacity},
      ]}>
      <View style={styles.numberContainer}>
        <Text
          style={{
            color: Colors[theme].primaryText,
            textAlignVertical: 'center',
            fontWeight: 'bold',
          }}>
          {props.number}
        </Text>
      </View>

      <View style={styles.textContainer}>
        <Text
          style={{
            color: Colors[theme].primaryText,
            textAlignVertical: 'center',
            textAlign: 'left',
          }}>
          {props.text.replace(/^\s+/g, '')}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <LikeIcon
          name={props.liked ? 'heart' : 'hearto'}
          color={Colors[theme].primaryOrange}
          size={Dimensions.iconMedSmall}
          onPress={() => props.onLike(props.id)}
          style={{marginRight: 5}}
        />
        <TouchableWithoutFeedback onPressIn={props.onDrag}>
          <Icon
            name="drag"
            color={Colors[theme].lightGray}
            size={Dimensions.iconMed}
          />
        </TouchableWithoutFeedback>
      </View>
    </ListItem>
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
});
