import React from 'react';
import ThemeContext from '../../context/ThemeContext';
import {View} from 'react-native';
import {getColor} from '../../constants/Themes';
import Dimensions from '../../constants/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
const renderIcon = (name: string, isCurrent: boolean, theme: string): any => {
  switch (name) {
    case 'Home':
      return (
        <AntDesign
          name="home"
          size={Dimensions.iconBottom}
          style={{
            color: isCurrent
              ? getColor(theme, 'primaryOrange')
              : getColor(theme, 'lightGray'),
          }}
        />
      );

    case 'Search':
      return (
        <AntDesign
          name="search1"
          size={Dimensions.iconBottom}
          style={{
            color: isCurrent
              ? getColor(theme, 'primaryOrange')
              : getColor(theme, 'lightGray'),
          }}
        />
      );

    case 'Favourites':
      return (
        <AntDesign
          name="hearto"
          size={Dimensions.iconBottom}
          style={{
            color: isCurrent
              ? getColor(theme, 'primaryOrange')
              : getColor(theme, 'lightGray'),
          }}
        />
      );

    default:
      break;
  }
};

export const BottomMenuItem = ({
  iconName,
  isCurrent,
}: {
  iconName: string;
  isCurrent: boolean;
}) => {
  const {theme} = React.useContext(ThemeContext);

  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: getColor(theme, 'primaryBackground'),
      }}>
      {renderIcon(iconName, isCurrent, theme)}
    </View>
  );
};
/* 
    case "Categories":
      return (
        <Entypo
          name="list"
          size={25}
          style={{
            color: isCurrent
              ? getColor(theme, 'primaryOrange')
              :  getColor(theme, 'lightGray'),
          }}
        />
      );
      */
