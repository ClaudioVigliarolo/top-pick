import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import ThemeContext from '../context/ThemeContext';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Icon,
  Container,
  Header,
  Footer,
  Content,
  ListItem,
  Right,
  Body,
  Left,
  Switch,
  List,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Animated from 'react-native-reanimated';
import {getColor} from '../constants/Themes';

import Dimensions from '../constants/Dimensions';
import keys from '../../database/keys/keys';

const CustomDrawer = ({progress, ...props}: {progress: number; props: any}) => {
  const {theme, setTheme} = React.useContext(ThemeContext);

  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const changeTheme = async () => {
    try {
      const newTheme = theme == 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await AsyncStorage.setItem(keys.THEME_KEY, newTheme);
    } catch (e) {}
  };

  return (
    <Container style={{backgroundColor: getColor(theme, 'primaryBackground')}}>
      <Header
        style={{
          backgroundColor: getColor(theme, 'primaryOrange'),
          borderBottomWidth: 0,
          height: 100,
        }}>
        <Left>
          {/* <Image
            source={require("../assets/images/icona.png")}
            style={{ width: 200, height: 200, marginTop: 100 }}
         />*/}
        </Left>

        <Right>
          <Text
            style={{
              color: '#fff',
              fontSize: Dimensions.fontMed,
            }}>
            {' '}
            TOP Picks
          </Text>
        </Right>
      </Header>
      <Content>
        <DrawerContentScrollView {...props}>
          <Animated.View style={{transform: [{translateX}]}}>
            <DrawerItemList {...props} />
          </Animated.View>
        </DrawerContentScrollView>
        <List>
          <ListItem>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  color: getColor(theme, 'drawerGrey'),
                  paddingRight: 20,
                }}>
                Dark Mode
              </Text>
              <Switch
                onValueChange={changeTheme}
                thumbColor={getColor(theme, 'primaryOrange')}
                value={theme == 'dark' ? true : false}
                trackColor={{
                  true: getColor(theme, 'checkOrange'),
                  false: getColor(theme, 'lighterGray'),
                }}></Switch>
            </View>
          </ListItem>
        </List>
      </Content>

      <Footer
        style={{backgroundColor: getColor(theme, 'lighterOrange')}}></Footer>
    </Container>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {},
});

//"#787878"
