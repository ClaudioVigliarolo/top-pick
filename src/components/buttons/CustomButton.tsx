import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import ThemeContext from '../../context/ThemeContext';

const CustomButton = ({
  onPress,
  title,
  color,
}: {
  onPress: any;
  title: string;
  color: string;
}) => {
  const {theme, setTheme} = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'darkorange',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '900',
      textTransform: 'uppercase',
    },
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.button, {backgroundColor: color}]}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
