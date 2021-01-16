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
import {View, StyleSheet} from 'react-native';
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
  onLongPress(): void;
  onLike(id: number): void;
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
      ]}
      onLongPress={props.onLongPress}>
      <View style={styles.textContainer}>
        <Text style={{color: Colors[theme].primaryText}}>{props.text}</Text>
      </View>
      <Right style={{position: 'absolute', right: '2%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <LikeIcon
            name={props.liked ? 'heart' : 'hearto'}
            color={Colors[theme].primaryOrange}
            size={Dimensions.iconMedSmall}
            onPress={() => props.onLike(props.id)}
            style={{marginRight: 5}}
          />
          <Icon
            name="drag"
            color={Colors[theme].lightGray}
            size={Dimensions.iconMed}
          />
        </View>
      </Right>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textContainer: {
    maxWidth: '80%',
  },
});
