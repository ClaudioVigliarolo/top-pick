import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import {CardItem, Body, Text} from 'native-base';
import Colors from '../../constants/Colors';
import Dimensions from '../../constants/Dimensions';

interface CustomCardItemProps {
  text: string;
  type: string;
  color: string;
  onPress: any;
}

const CustomCardItem = (props: CustomCardItemProps) => {
  const {theme, setTheme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      opacity: Colors[theme].type == 'light' ? 0.8 : 1,
    },
  });

  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.85}>
      <View style={styles.container}>
        <CardItem
          style={{
            backgroundColor: Colors[theme].primaryBackground,
            opacity: Colors[theme].type == 'light' ? 0.8 : 1,
          }}>
          <Body>
            <Text style={{color: Colors[theme].primaryText}}>{props.text}</Text>
          </Body>
          <Text style={{textAlign: 'right', color: Colors[theme].primaryText}}>
            {props.type}
          </Text>
        </CardItem>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCardItem;
