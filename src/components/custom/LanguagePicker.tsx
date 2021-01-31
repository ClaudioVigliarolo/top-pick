import React, {Component} from 'react';
import {View} from 'react-native';
import {getColor} from '../../constants/Themes';
import DropDownPicker from 'react-native-dropdown-picker';
import ThemeContext from '../../context/ThemeContext';
import Dimensions from '../../constants/Dimensions';

const DEFAULT_TEXT = 'App language: ';
interface CategoryListProps {
  title: string;
  onLanguageChange(newLang: string): void;
  selected: string;
}

export default function CategoryList(props: CategoryListProps) {
  const [text, setText] = React.useState<string>(DEFAULT_TEXT);
  const {theme} = React.useContext(ThemeContext);

  return (
    <View
      style={{
        padding: 0,
        marginTop: 5,
      }}>
      <DropDownPicker
        items={[
          {
            label: text + 'English',
            value: 'en',
            selected: props.selected == 'en',
            // icon: () => <Icon name="flag" size={18} color="#900" />,
          },
          {
            label: text + 'Italiano',
            value: 'it',
            selected: props.selected == 'it',
            //  icon: () => {if(props.selected == 'it') <Icon name="flag" size={18} color="#900" />},
          },
        ]}
        style={{
          backgroundColor: getColor(theme, 'primaryBackground'),
          borderWidth: 0,
        }}
        placeholder={text + props.title}
        //selectedLabelStyle={{color: getColor(theme, 'primaryOrange')}}
        placeholderStyle={{color: '#fff'}}
        containerStyle={{height: 40}}
        labelStyle={{
          color: '#fff',
          fontSize: Dimensions.fontList,
        }}
        onOpen={() => setText(text.replace(DEFAULT_TEXT, ''))}
        dropDownStyle={{
          backgroundColor: getColor(theme, 'primaryHeaderBackground'),
          borderWidth: 0,
        }}
        onChangeItem={(item) => props.onLanguageChange(item.value)}
      />
      <View
        style={{
          borderBottomColor: getColor(theme, 'lineColor'),
          marginLeft: '4%',
          marginTop: 5,
          borderBottomWidth: 1,
        }}></View>
    </View>
  );
}
