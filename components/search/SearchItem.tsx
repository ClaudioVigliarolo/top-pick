import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import ThemeContext from "../../context/ThemeContext";

interface SearchItemProps {}

const SearchItem = (props: SearchItemProps) => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text>SearchItem</Text>
    </View>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  container: {},
});
