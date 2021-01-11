import React, { Component } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Carousel from "react-native-snap-carousel"; // Version can be specified in package.json
import IconNext from "react-native-vector-icons/MaterialIcons";
import IconPrevious from "react-native-vector-icons/MaterialIcons";
import ThemeContext from "../../context/ThemeContext";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";

import { scrollInterpolator, animatedStyles } from "../../utils/animations";

const SLIDER_WIDTH = Dimensions.SCREEN_WIDTH;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.85);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 4) / 4);

const colorsData = require("../../data/card_templates.json");

interface CardProps {
  title: string;
  getString: () => string[];
}

interface CarouselProps {
  carouselItems: CardProps[];
  activeIndex: number;
  setIndex: Function;
  onTopicPress: Function;
}
interface CarouselState {
  color: string;
  colors: string[];
}

const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}

export default class TopicCarousel extends React.Component<
  CarouselProps,
  CarouselState
> {
  state = {
    colors: [],
    color: "",
  };
  componentDidMount() {
    this.setRandomColors();
  }
  static contextType = ThemeContext;
  _carousel = {};

  _renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.props.onTopicPress(item.title)}
      >
        <View
          style={[styles.itemContainer, { backgroundColor: this.state.color }]}
        >
          <Text style={styles.itemLabel}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  setRandomColors = (): void => {
    const colors = colorsData[Colors[this.context.theme].type];
    let randomIndex = Math.floor(Math.random() * colors.length);
    this.setState({ colors, color: colors[randomIndex] });
  };
  getCarousel() {
    return this._carousel;
  }

  getRandomColor = (): void => {
    let newcolor = this.state.color;
    while (newcolor == this.state.color) {
      let randomIndex = Math.floor(Math.random() * this.state.colors.length);
      newcolor = this.state.colors[randomIndex];
    }
    this.setState({ color: newcolor });
  };

  render() {
    return (
      <View>
        <Carousel
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.props.carouselItems}
          //sliderHeight={Dimensions.SCREEN_HEIGHT / 1.7}
          itemHeight={Dimensions.SCREEN_HEIGHT / 1.7}
          onSnapToItem={(index) => {
            this.getRandomColor();
            this.props.setIndex(index);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "dodgerblue",
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
