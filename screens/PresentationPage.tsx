import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ThemeContext from '../context/ThemeContext';
import Colors from '../constants/Colors';
import Dimensions from '../constants/Dimensions';
import Slider from '../components/custom/Slider';

export default function PresentationPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {questions, topic}: {questions: Question; topic: Topic} = route.params;
  const {theme, setTheme} = React.useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Slider
        backgroundColor={Colors[theme].primaryOrange}
        textColor={Colors[theme].whiteText}
        title={topic}
        items={questions}
        onClose={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
