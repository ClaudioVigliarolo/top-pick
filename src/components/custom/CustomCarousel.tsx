import React, {Component} from 'react';
import {Text, View, StyleSheet, Alert, Dimensions as Dim} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Topic} from '../../interfaces/Interfaces';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import ThemeContext from '../../context/ThemeContext';
import {getColor} from '../../constants/Themes';
import Dimensions from '../../constants/Dimensions';

import {scrollInterpolator, animatedStyles} from '../../utils/animations';

//const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 4) / 4);
const colorsData = require('../../constants/card_templates.json');

interface CarouselProps {
  carouselItems: Topic[];
  activeIndex: number;
  setIndex: Function;
  onTopicPress: Function;
}

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}
const TopicCarousel = React.forwardRef((props: CarouselProps, ref) => {
  const {theme} = React.useContext(ThemeContext);
  const [colors, setColors] = React.useState<string[]>([]);
  const [color, setColor] = React.useState<string>('');
  const [width, setWidth] = React.useState<number>(Dim.get('window').width);
  const [height, setheight] = React.useState<number>(Dim.get('window').height);

  React.useEffect(() => {
    setRandomColors();
    Dim.addEventListener('change', (e) => {
      const {width, height} = e.window;
      setWidth(width);
      setheight(height);
    });
  }, []);

  const itemWidth = width * Dimensions.CAROUSEL_ITEM_WIDTH_FACTOR;
  const itemHeight = height * Dimensions.CAROUSEL_ITEM_HEIGHT_FACTOR;
  let _carousel = {};

  React.useImperativeHandle(ref, () => ({
    validate() {},

    getCarousel() {
      return _carousel;
    },
  }));
  const _renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => props.onTopicPress(item)}>
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: color,
              width: itemWidth,
              height: itemHeight,
            },
          ]}>
          <Text style={styles.itemLabel}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const setRandomColors = (): void => {
    const colors = colorsData[getColor(theme, 'type')];
    let randomIndex = Math.floor(Math.random() * colors.length);
    setColors(colors);
    setColor(colors[randomIndex]);
  };
  const getCarousel = () => {
    return _carousel;
  };

  const getRandomColor = (): void => {
    let newcolor = color;
    while (newcolor == color) {
      let randomIndex = Math.floor(Math.random() * colors.length);
      newcolor = colors[randomIndex];
    }
    setColor(newcolor);
  };

  const styles = StyleSheet.create({
    carouselContainer: {
      marginTop: '10%',
    },
    itemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'dodgerblue',
    },
    itemLabel: {
      color: 'white',
      fontSize: 24,
    },
    counter: {
      marginTop: 25,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <View>
      <Carousel
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={itemWidth}
        containerCustomStyle={styles.carouselContainer}
        inactiveSlideShift={0}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
        ref={(c) => {
          _carousel = c;
        }}
        data={props.carouselItems}
        //sliderHeight={Dimensions.SCREEN_HEIGHT / 1.7}
        itemHeight={Dimensions.SCREEN_HEIGHT / 1.7}
        onSnapToItem={(index) => {
          getRandomColor();
          props.setIndex(index);
        }}
      />
    </View>
  );
});

export default TopicCarousel;
