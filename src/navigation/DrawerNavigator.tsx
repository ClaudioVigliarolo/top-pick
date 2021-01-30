import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TabNavigator} from './BottomMenu';
import ThemeContext from '../context/ThemeContext';
import {
  CategoriesStack,
  FavouritesStack,
  SettingsStack,
} from './StackNavigator';
import {LocalizationContext} from '../context/LocalizationContext';
import {getColor} from '../constants/Themes';
import IconHome from 'react-native-vector-icons/Entypo';
import IconCategory from 'react-native-vector-icons/Entypo';
import IconFavourites from 'react-native-vector-icons/AntDesign';
import IconSettings from 'react-native-vector-icons/SimpleLineIcons';

import SideBar from './CustomDrawer';
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}: {navigation: any}) => {
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideBar {...props} />}
      drawerContentOptions={{
        activeTintColor: getColor(theme, 'primaryOrange'),
        inactiveTintColor: getColor(theme, 'drawerGrey'),
        itemStyle: {marginVertical: 5},
        labelStyle: {},
      }}>
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: 'Home',
          drawerIcon: () => (
            <IconHome
              name="home"
              size={20}
              color={getColor(theme, 'primaryOrange')}
            />
          ),
        }}
        component={TabNavigator}
      />

      <Drawer.Screen
        name="Categories"
        options={{
          drawerLabel: translations.CATEGORIES,
          drawerIcon: () => (
            <IconCategory
              name="list"
              size={20}
              color={getColor(theme, 'primaryOrange')}
            />
          ),
        }}
        component={CategoriesStack}
      />

      <Drawer.Screen
        name="Favourites"
        options={{
          drawerLabel: translations.FAVOURITES,
          drawerIcon: () => (
            <IconFavourites
              name="hearto"
              size={20}
              color={getColor(theme, 'primaryOrange')}
            />
          ),
        }}
        component={FavouritesStack}
      />
      <Drawer.Screen
        name="SettingsStack"
        options={{
          drawerLabel: translations.SETTINGS,
          drawerIcon: () => (
            <IconSettings
              name="settings"
              size={20}
              color={getColor(theme, 'primaryOrange')}
            />
          ),
        }}
        component={SettingsStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
