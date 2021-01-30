import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import {CardItem, Body, Text} from 'native-base';
import {getColor} from '../../constants/Themes';
import Dimensions from '../../constants/Dimensions';

interface CustomCardItemProps {
  text: string;
  type: string;
  color: string;
  onPress: any;
}

const CustomCardItem = (props: CustomCardItemProps) => {
  const {theme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      opacity: getColor(theme, 'type') == 'light' ? 0.8 : 1,
    },
  });

  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.85}>
      <View style={styles.container}>
        <CardItem
          style={{
            backgroundColor: getColor(theme, 'primaryBackground'),
            opacity: getColor(theme, 'type') == 'light' ? 0.8 : 1,
          }}>
          <Body>
            <Text style={{color: getColor(theme, 'primaryText')}}>
              {props.text}
            </Text>
          </Body>
          <Text
            style={{textAlign: 'right', color: getColor(theme, 'primaryText')}}>
            {props.type}
          </Text>
        </CardItem>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCardItem;
