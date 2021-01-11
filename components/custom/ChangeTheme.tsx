import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Colors from "../../constants/Colors";
import ThemeContext from "../../context/ThemeContext";
import Dimensions from "../../constants/Dimensions";

interface ChangeThemeProps {}

const ChangeTheme = (props: ChangeThemeProps) => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <View>
      <Text>Dark Mode</Text>
      <CheckBox
        disabled={false}
        tintColors={{
          true: Colors[theme].primaryOrange,
          false: Colors[theme].lightGray,
        }}
        // value={}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
    </View>
  );
};

export default ChangeTheme;

const styles = StyleSheet.create({
  container: {},
});
