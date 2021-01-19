import * as React from 'react';
import {
  PixelRatio,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions as Dim,
} from 'react-native';
import Colors from '../constants/Colors';
import ThemeContext from '../context/ThemeContext';
import {Text, View, StyleSheet, Image} from 'react-native';
import Dimensions from '../constants/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../components/buttons/CustomButton';

const StartSlides = ({onDone}: {onDone(): void}) => {
  const {theme, setTheme} = React.useContext(ThemeContext);
  const [sliderState, setSliderState] = React.useState({currentPage: 0});
  const {width, height} = Dim.get('window');

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

  const {currentPage: pageIndex} = sliderState;

  const styles = StyleSheet.create({
    imageStyle: {
      height: '50%',
      width: '100%',
    },
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
      width: '80%',
      alignSelf: 'center',
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: '5%',
      textAlign: 'center',
      color: Colors.dark.whiteText,
    },
    lastSlideHeader: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: '50%',
      marginBottom: 20,
      textAlign: 'center',
      color: Colors.dark.whiteText,
    },
    paragraph: {
      fontSize: Dimensions.fontMed,
      textAlign: 'center',
      color: Colors.dark.whiteText,
    },
    paginationWrapper: {
      position: 'absolute',
      bottom: '5%',
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
      backgroundColor: 'white',
      marginLeft: 10,
    },
    lastSlide: {
      flex: 1,
      width: '80%',
      alignSelf: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={{
            flex: 1,

            backgroundColor: Colors.dark.primaryOrange,
          }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}>
          <View style={{width, height}}>
            <Image
              resizeMode="center"
              source={require('./images/0.png')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Welcome to Top Pick!</Text>
              <Text style={styles.paragraph}>
                Here’s a quick guide to show you how to use the app
              </Text>
            </View>
          </View>
          <View style={{width, height}}>
            <Image
              source={require('./images/1.png')}
              style={styles.imageStyle}
              resizeMode="center"
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Step 1: Choose</Text>
              <Text style={styles.paragraph}>
                Simply press on the card to select the topic
              </Text>
            </View>
          </View>
          <View style={{width, height}}>
            <Image
              source={require('./images/2.png')}
              style={styles.imageStyle}
              resizeMode="center"
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>STEP 2: Select </Text>
              <Text style={styles.paragraph}>
                You can Select the questions you like by pressing the little
                square on the right
              </Text>
            </View>
          </View>
          <View style={{width, height}}>
            <Image
              source={require('./images/3.png')}
              style={styles.imageStyle}
              resizeMode="center"
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>STEP 3: Arrange</Text>
              <Text style={styles.paragraph}>
                You can put the questions in the order you prefer by dragging
                the icon on the right
              </Text>
            </View>
          </View>

          <View style={{width, height}}>
            <View style={styles.lastSlide}>
              <Text style={styles.lastSlideHeader}>We are all ready</Text>
              <Text style={styles.paragraph}>
                TIP: You can rewatch this tutorial in the settings folder
              </Text>
              <View style={{alignSelf: 'center', width: 200, marginTop: '30%'}}>
                <Button
                  color={Colors[theme].lighterOrange}
                  title="Start!"
                  onPress={() => {
                    onDone();
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(5).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                {opacity: pageIndex === index ? 1 : 0.2},
              ]}
              key={index}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

export default StartSlides;
