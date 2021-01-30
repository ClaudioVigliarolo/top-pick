import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { HomeStack, FavouritesStack, SearchStack } from "./StackNavigator";
import ThemeContext from "../context/ThemeContext";
import Icon from "react-native-vector-icons/AntDesign";
import Colors from "../constants/Colors";
import { TabBar } from "../navigation/TabBar";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const hiddenBarRoutes = ["QuestionsScreen"];

const TabNavigator = ({ navigation }: { navigation: any }) => {
  const Tab = createBottomTabNavigator();

  const isTabVisible = (route: any): boolean => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "";
    if (routeName === "Questions") {
      return false;
    }
    return true;
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar: false,
        }}
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={({ route }) => ({
            tabBarVisible: ((route) => {
              return isTabVisible(route);
            })(route),
          })}
        />

        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={({ route }) => ({
            tabBarVisible: ((route) => {
              return isTabVisible(route);
            })(route),
          })}
        />
      </Tab.Navigator>
    </View>
  );
};

export { TabNavigator };
