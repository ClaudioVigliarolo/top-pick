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
import { View, StyleSheet } from "react-native";
import ThemeContext from "../../context/ThemeContext";
import Colors from "../../constants/Colors";
import Icon from "react-native-vector-icons/AntDesign";
import CheckBox from "@react-native-community/checkbox";
import Dimensions from "../../constants/Dimensions";

interface ListItemCheckBoxProps {
  text: string;
  value: boolean;
  onPress(): void;
  onValChange: any;
}

const ListItemCheckBox = (props: ListItemCheckBoxProps) => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <ListItem style={styles.container} onPress={props.onPress}>
      <View style={styles.textContainer}>
        <Text style={{ color: Colors[theme].primaryText }}>{props.text}</Text>
      </View>
      <Right style={{ position: "absolute", right: "10%" }}>
        <CheckBox
          disabled={false}
          tintColors={{
            true: Colors.light.primaryOrange,
            false: Colors.light.lightGray,
          }}
          value={props.value}
          onValueChange={(newValue: boolean) => props.onValChange(newValue)}
        />
      </Right>
    </ListItem>
  );
};

export default ListItemCheckBox;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.SCREEN_WIDTH,
    position: "relative",
  },
  textContainer: {
    maxWidth: "82%",
  },
});
