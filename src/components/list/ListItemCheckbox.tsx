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
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import {getColor} from '../../constants/Themes';
import CheckBox from '@react-native-community/checkbox';
import Dimensions from '../../constants/Dimensions';

interface ListItemCheckBoxProps {
  text: string;
  value: boolean;
  onPress?(): void;
  onValChange: any;
}

const ListItemCheckBox = (props: ListItemCheckBoxProps) => {
  const {theme} = React.useContext(ThemeContext);

  return (
    <ListItem style={styles.container}>
      <TouchableWithoutFeedback onPress={props.onPress}>
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
    </ListItem>
  );
};

export default ListItemCheckBox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  textContainer: {
    maxWidth: '82%',
  },
});
