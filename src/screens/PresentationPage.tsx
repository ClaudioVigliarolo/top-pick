import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ThemeContext from '../context/ThemeContext';
import {Question, Topic} from '../interfaces/Interfaces';
import {getColor} from '../constants/Themes';
import Slider from '../components/custom/Slider';

export default function PresentationPage({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const {questions, topic}: {questions: Question; topic: Topic} = route.params;
  const {theme} = React.useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Slider
        backgroundColor={getColor(theme, 'primaryOrange')}
        textColor={'#fff'}
        title={topic.value}
        items={questions}
        image={null}
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
