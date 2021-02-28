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
import {getColor} from '../../constants/Themes';
import Icon from 'react-native-vector-icons/AntDesign';

import Dimensions from '../../constants/Dimensions';

interface CustomListItemProps {
  text: string;
  secondaryText?: string | number;
  onPress(): void;
  icon: boolean;
}

const CustomListItem = (props: CustomListItemProps) => {
  const {theme} = React.useContext(ThemeContext);

  return (
    <ListItem style={styles.container} onPress={props.onPress}>
      <Text
        style={{
          color: getColor(theme, 'primaryText'),
          fontSize: Dimensions.fontList,
          textTransform: 'capitalize',
        }}>
        {props.text.replace(/\s+/g, ' ').trim()}
      </Text>
      <Text
        style={{
          color: getColor(theme, 'lightGray'),
          position: 'absolute',
          right: '20%',
          textTransform: 'capitalize',
        }}>
        {props.secondaryText}
      </Text>
      {props.icon && (
        <Right style={{position: 'absolute', right: '10%'}}>
          <Icon
            name="right"
            color={getColor(theme, 'lightGray')}
            size={Dimensions.iconSmall}
          />
        </Right>
      )}
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
});
