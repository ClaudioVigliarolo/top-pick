import * as React from 'react';
import {
  PixelRatio,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions as Dim,
} from 'react-native';
import {Question} from '../../interfaces/Interfaces';
import {Text, View, StyleSheet, Image} from 'react-native';
import Dimensions from '../../constants/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface SliderProps {
  backgroundColor: string;
  textColor: string;
  title: string;
  items: Question[];
  image: Image | null;
  onClose(): void;
}

const Slider = (props: SliderProps) => {
  const [sliderState, setSliderState] = React.useState({currentPage: 0});
  const [width, setWidth] = React.useState<number>(Dim.get('window').width);
  const [height, setheight] = React.useState<number>(Dim.get('window').height);

  React.useEffect(() => {
    Dim.addEventListener('change', (e) => {
      const {width, height} = e.window;
      setWidth(width);
      setheight(height);
    });
  }, []);
  const setSliderPage = (event: any) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      paddingTop: '20%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 5,
      textAlignVertical: 'center',
    },
    title: {
      textAlign: 'center',
      fontWeight: '100',
      marginTop: '2%',
      textTransform: 'uppercase',
      fontSize: Dimensions.fontMed,
      color: props.textColor,
    },
    question: {
      fontSize: Dimensions.fontBig,
      fontWeight: 'bold',
      color: props.textColor,
      textAlign: 'center',
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      color: props.textColor,
    },
    paragraph: {
      fontSize: 17,
    },
    paginationWrapper: {
      position: 'absolute',
      bottom: '15%',
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    paginationDots: {
      height: 10,
      width: 10,
      borderRadius: 10 / 2,
      backgroundColor: '#fff',
      marginLeft: 10,
    },
    titleSection: {
      height: '8%',
      width: '100%',
    },
  });

  const {currentPage: pageIndex} = sliderState;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: props.backgroundColor,
          position: 'relative',
        }}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{props.title}</Text>
          <AntDesign
            name="close"
            onPress={props.onClose}
            size={35}
            style={{
              color: '#fff',
              position: 'absolute',
              right: '2%',
              top: '5%',
              opacity: 0.7,
            }}
          />
        </View>
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}>
          {props.items.map((item: Question, index: number) => (
            <View key={index} style={{width, height}}>
              <View style={styles.wrapper}>
                <Text style={styles.question}>{item.title}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(props.items.length).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                {opacity: pageIndex === index ? 0.8 : 0.2},
              ]}
              key={index}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Slider;
