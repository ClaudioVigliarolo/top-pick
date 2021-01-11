import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TabNavigator } from "./BottomMenu";
import ThemeContext from "../context/ThemeContext";
import { CategoriesStack, FavouritesStack } from "./StackNavigator";
import Colors from "../constants/Colors";
import IconHome from "react-native-vector-icons/Entypo";
import IconCategory from "react-native-vector-icons/Entypo";
import IconFavourites from "react-native-vector-icons/AntDesign";
import IconRecents from "react-native-vector-icons/MaterialIcons";

import SideBar from "./CustomDrawer";
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }: { navigation: any }) => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideBar {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors[theme].primaryOrange,
        inactiveTintColor: Colors[theme].drawerGrey,
        itemStyle: { marginVertical: 5 },
        labelStyle: {},
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerLabel: "Home",
          drawerIcon: () => (
            <IconHome
              name="home"
              size={20}
              color={Colors[theme].primaryOrange}
            />
          ),
        }}
        component={TabNavigator}
      />

      <Drawer.Screen
        name="Categories"
        options={{
          drawerLabel: "Categories",
          drawerIcon: () => (
            <IconCategory
              name="list"
              size={20}
              color={Colors[theme].primaryOrange}
            />
          ),
        }}
        component={CategoriesStack}
      />

      <Drawer.Screen
        name="Favourites"
        options={{
          drawerLabel: "Favourites",
          drawerIcon: () => (
            <IconFavourites
              name="hearto"
              size={20}
              color={Colors[theme].primaryOrange}
            />
          ),
        }}
        component={FavouritesStack}
      />

      {/*  <Drawer.Screen
        name="Recents"
        options={{
          drawerLabel: "Recents",
          drawerIcon: () => (
            <IconRecents
              name="history"
              size={25}
              color={Colors[theme].primaryOrange}
            />
          ),
        }}
        component={FavouritesStack}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
