import React from 'react';
import {View, Header, Item, Input, Button, Text} from 'native-base';
import ThemeContext from '../../context/ThemeContext';
import {getColor} from '../../constants/Themes';
import IconBack from 'react-native-vector-icons/MaterialIcons';
import Dimensions from '../../constants/Dimensions';
import IconAdd from 'react-native-vector-icons/Ionicons';
interface AddBarProps {
  text: string;
  placeholder: string;
  setText: any;
  onAdd: any;
}

const AddBar = (props: AddBarProps) => {
  const {theme} = React.useContext(ThemeContext);

  return (
    <React.Fragment>
      <Header
        searchBar
        rounded
        androidStatusBarColor={getColor(theme, 'primaryHeaderBackground')}
        style={{backgroundColor: getColor(theme, 'barExternalColor')}}>
        <Item style={{backgroundColor: getColor(theme, 'barColor')}}>
          <IconAdd
            name="add"
            size={Dimensions.iconMed}
            style={{paddingLeft: 10}}
            color={getColor(theme, 'searchIconColor')}
          />
          <Input
            onChangeText={props.setText} // <-- Here
            placeholder={props.placeholder}
            value={props.text}
            style={{color: getColor(theme, 'barTextColor')}}
            onSubmitEditing={() => props.onAdd()}
          />
          <IconBack
            name="cancel"
            color={getColor(theme, 'searchBarIcon')}
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
export default AddBar;
