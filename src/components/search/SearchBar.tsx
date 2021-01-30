import React from 'react';
import {View, Header, Item, Input, Icon, Button, Text} from 'native-base';
import ThemeContext from '../../context/ThemeContext';
import {getColor} from '../../constants/Themes';
import IconBack from 'react-native-vector-icons/MaterialIcons';
import Dimensions from '../../constants/Dimensions';
interface SearchBarProps {
  text: string;
  placeholder: string;
  setText: any;
  automatic: boolean;
}

const SearchBar = (props: SearchBarProps) => {
  const {theme} = React.useContext(ThemeContext);

  return (
    <React.Fragment>
      <Header
        searchBar
        rounded
        androidStatusBarColor={getColor(theme, 'primaryHeaderBackground')}
        style={{backgroundColor: getColor(theme, 'barExternalColor')}}>
        <Item style={{backgroundColor: getColor(theme, 'barColor')}}>
          <Icon
            name="ios-search"
            style={{color: getColor(theme, 'searchIconColor')}}
          />
          <Input
            autoFocus={props.automatic}
            onChangeText={props.setText} // <-- Here
            placeholder={props.placeholder}
            value={props.text}
            style={{color: getColor(theme, 'barTextColor')}}
          />
          <IconBack
            name="cancel"
            color={getColor(theme, 'searchIconColor')}
            size={Dimensions.iconCancelBar}
            style={{padding: 5}}
            onPress={() => props.setText('')}
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
