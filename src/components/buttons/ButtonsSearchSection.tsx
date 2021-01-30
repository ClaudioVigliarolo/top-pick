import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import ThemeContext from '../../context/ThemeContext';

import {Text, Button} from 'native-base';
import {getColor} from '../../constants/Themes';
import Dimensions from '../../constants/Dimensions';

interface Topic {
  title: string;
  value: string;
}

interface ButtonsSectionProps {
  header: string;
  buttons: Array<Topic>;
  onSearch: any;
}

const ButtonsSection = (props: ButtonsSectionProps) => {
  const {theme} = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
    },
    header: {
      fontWeight: 'bold',
      fontSize: Dimensions.fontMed,
      marginBottom: 10,
      color: getColor(theme, 'primaryText'),
      textAlign: 'center',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'stretch',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    button: {
      width: 50,
      height: 10,
      backgroundColor: getColor(theme, 'primaryBackground'),
      borderColor: getColor(theme, 'primaryOrange'),
      borderWidth: 2,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props.header}</Text>
      <View style={styles.buttonContainer}>
        {console.log(props.buttons)}
        {props.buttons.map((button: Topic, i) => (
          <React.Fragment key={i}>
            <Button
              rounded
              bordered
              activeOpacity={0.2}
              onPress={() => props.onSearch(button)}
              style={{
                borderColor: getColor(theme, 'darkerOrange'),
                borderWidth: 10,
                marginRight: 10,
                marginTop: 10,
              }}>
              <Text style={{color: getColor(theme, 'darkerOrange')}}>
                {button.value}
              </Text>
            </Button>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

export default ButtonsSection;
