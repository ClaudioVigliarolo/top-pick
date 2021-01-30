import React, {Component} from 'react';
import {View} from 'react-native';
import {getColor} from '../../constants/Themes';
import DropDownPicker from 'react-native-dropdown-picker';
import ThemeContext from '../../context/ThemeContext';
import Dimensions from '../../constants/Dimensions';
import Icon from 'react-native-vector-icons/Feather';

interface CategoryListProps {
  title: string;
  onLanguageChange(newLang: string): void;
  selected: string;
}

export default function CategoryList(props: CategoryListProps) {
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
            label: 'English',
            value: 'en',
            selected: props.selected == 'en',
            icon: () => <Icon name="flag" size={18} color="#900" />,
          },
          {
            label: 'Italiano',
            value: 'it',
            selected: props.selected == 'it',
            icon: () => <Icon name="flag" size={18} color="#900" />,
          },
          {
            label: 'Deutsch',
            value: 'de',
            selected: props.selected == 'de',
            icon: () => <Icon name="flag" size={18} color="#900" />,
          },
        ]}
        style={{
          backgroundColor: getColor(theme, 'primaryBackground'),
          borderWidth: 0,

          //  marginLeft: '-4%',
        }}
        placeholder={props.title}
        //selectedLabelStyle={{color: getColor(theme, 'primaryOrange')}}
        placeholderStyle={{color: '#fff'}}
        containerStyle={{height: 40}}
        labelStyle={{
          color: getColor(theme, 'primaryText'),
          fontSize: Dimensions.fontList,
        }}
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
