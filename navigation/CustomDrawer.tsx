import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import ThemeContext from "../context/ThemeContext";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
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
} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import Animated from "react-native-reanimated";
import Colors from "../constants/Colors";
import Dimensions from "../constants/Dimensions";
import data from "../database/keys";

const CustomDrawer = ({
  progress,
  ...props
}: {
  progress: number;
  props: any;
}) => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const translateX = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const changeTheme = async () => {
    try {
      const newTheme = theme == "light" ? "dark" : "light";
      setTheme(newTheme);
      await AsyncStorage.setItem(data.THEME_KEY, newTheme);
      console.log("Data successfully saved");
    } catch (e) {
      console.log("Failed to save the data to the storage");
    }
  };

  return (
    <Container style={{ backgroundColor: Colors[theme].primaryBackground }}>
      <Header
        style={{
          backgroundColor: Colors[theme].primaryOrange,
          borderBottomWidth: 0,
          height: 100,
        }}
      >
        <Left>
          {/* <Image
            source={require("../assets/images/icona.png")}
            style={{ width: 200, height: 200, marginTop: 100 }}
         />*/}
        </Left>

        <Right>
          <Text
            style={{
              color: Colors[theme].whiteText,
              fontSize: Dimensions.fontMed,
            }}
          >
            {" "}
            TOP Picks
          </Text>
        </Right>
      </Header>
      <Content>
        <DrawerContentScrollView {...props}>
          <Animated.View style={{ transform: [{ translateX }] }}>
            <DrawerItemList {...props} />
          </Animated.View>
        </DrawerContentScrollView>
        <List>
          <ListItem>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{ color: Colors[theme].drawerGrey, paddingRight: 20 }}
              >
                Dark Mode
              </Text>
              <Switch
                onValueChange={changeTheme}
                thumbColor={Colors[theme].primaryOrange}
                value={theme == "dark" ? true : false}
                trackColor={{
                  true: Colors[theme].checkOrange,
                  false: Colors[theme].lighterGray,
                }}
              ></Switch>
            </View>
          </ListItem>
        </List>
      </Content>

      <Footer style={{ backgroundColor: Colors[theme].lighterOrange }}></Footer>
    </Container>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {},
});

//"#787878"
