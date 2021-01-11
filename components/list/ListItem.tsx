import * as React from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Right,
} from "native-base";
import ThemeContext from "../../context/ThemeContext";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Icon from "react-native-vector-icons/AntDesign";

import Dimensions from "../../constants/Dimensions";

interface CustomListItemProps {
  text: string;
  secondaryText: string | number;
  onPress(): void;
}

const CustomListItem = (props: CustomListItemProps) => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <ListItem style={styles.container} onPress={props.onPress}>
      <Text style={{ color: Colors[theme].primaryText }}>{props.text}</Text>
      <Text
        style={{
          color: Colors[theme].lightGray,
          position: "absolute",
          right: "20%",
        }}
      >
        {props.secondaryText}
      </Text>
      <Right style={{ position: "absolute", right: "10%" }}>
        <Icon
          name="right"
          color={Colors[theme].lightGray}
          size={Dimensions.iconSmall}
        />
      </Right>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.SCREEN_WIDTH,
    position: "relative",
  },
});
