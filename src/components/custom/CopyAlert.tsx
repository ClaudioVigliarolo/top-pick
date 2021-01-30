import * as React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
} from 'native-base';
import ThemeContext from '../../context/ThemeContext';
import {getColor} from '../../constants/Themes';
interface CopyAlertProps {
  isShown: boolean;
}

const CopyAlert = (props: CopyAlertProps) => {
  const {theme} = React.useContext(ThemeContext);
  const [fadeAnimation] = React.useState(new Animated.Value(0));
  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0.9,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    props.isShown ? fadeIn() : fadeOut();
  }, [props.isShown]);

  const styles = StyleSheet.create({
    fadingContainer: {
      backgroundColor: getColor(theme, 'primaryOrange'),
      width: '50%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 5,
      opacity: 0.9,
      position: 'absolute',
      bottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnimation,
          },
        ]}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Copied!
        </Text>
      </Animated.View>
    </View>
  );
};

export default CopyAlert;
