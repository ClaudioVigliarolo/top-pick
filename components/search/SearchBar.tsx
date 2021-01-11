import React, { Component } from "react";
import { View, Header, Item, Input, Icon, Button, Text } from "native-base";
import ThemeContext from "../../context/ThemeContext";
import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";

interface SearchBarProps {
  text: string;
  placeholder: string;
  setText: Function;
  automatic: boolean;
}

const SearchBar = (props: SearchBarProps) => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <React.Fragment>
      <Header
        searchBar
        rounded
        androidStatusBarColor={Colors[theme].primaryHeaderBackground}
        style={{ backgroundColor: Colors[theme].barExternalColor }}
      >
        <Item style={{ backgroundColor: Colors[theme].barColor }}>
          <Icon
            name="ios-search"
            style={{ color: Colors[theme].searchIconColor }}
          />
          <Input
            autoFocus={props.automatic}
            onChangeText={props.setText} // <-- Here
            placeholder={props.placeholder}
            value={props.text}
            style={{ color: Colors[theme].barTextColor }}
          />
          <Icon
            name="ios-people"
            style={{ color: Colors[theme].secondaryIcon }}
          />
        </Item>
        <Button transparent>
          <Text>{props.placeholder}</Text>
        </Button>
      </Header>
    </React.Fragment>
  );
};
export default SearchBar;
