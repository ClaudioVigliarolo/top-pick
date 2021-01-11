import * as React from 'react';
import {View, Image, TouchableOpacity, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../screens/HomePage';
import CategoriesPage from '../screens/CategoriesPage';
import ThemeContext from '../context/ThemeContext';
import TopicsPage from '../screens/TopicsPage';
import QuestionsPage from '../screens/QuestionsPage';
import OrderPage from '../screens/OrderPage';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import IconBack from 'react-native-vector-icons/MaterialIcons';
import MenuIcon from 'react-native-vector-icons/MaterialIcons';

import FavouritesPage from '../screens/FavouritesPage';
import SearchPage from '../screens/SearchPage';
import PresentationPage from '../screens/PresentationPage';

import Colors from '../constants/Colors';
import Dimensions from '../constants/Dimensions';

const Stack = createStackNavigator();

const NavigationDrawerStructure = (props: any) => {
  const {theme, setTheme} = React.useContext(ThemeContext);
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <MenuIcon
          name="menu"
          color={Colors[theme].headerPrimary}
          size={Dimensions.iconMed}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

interface BackStructureProps {
  navigation: any;
  destination: string | null;
}
const BackStructure = (props: BackStructureProps) => {
  const {theme, setTheme} = React.useContext(ThemeContext);

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          props.destination
            ? props.navigation.navigate(props.destination)
            : props.navigation.goBack();
        }}>
        {/*Donute Button Image */}
        <IconBack
          name="arrow-back"
          color={Colors[theme].secondaryIcon}
          size={Dimensions.iconMed}
          style={{
            marginLeft: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const CategoriesStack = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {theme, setTheme} = React.useContext(ThemeContext);
  return (
    <Stack.Navigator initialRouteName="CategoriesScreen">
      <Stack.Screen
        name="CategoriesScreen"
        component={CategoriesPage}
        options={{
          title: 'Categories', //Set Header Title
          headerLeft: () => (
            <BackStructure destination={null} navigation={navigation} />
          ),
          headerStyle: {
            backgroundColor: Colors[theme].primaryHeaderBackground, //Set Header color
          },
          headerTintColor: Colors[theme].headerPrimary, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />

      <Stack.Screen
        name="Topics"
        component={TopicsPage}
        options={{
          title: 'Topics', //Set Header Title
          headerStyle: {
            backgroundColor: Colors[theme].primaryHeaderBackground, //Set Header color
          },
          headerTintColor: Colors[theme].headerPrimary, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Questions"
        component={QuestionsStack}
      />
    </Stack.Navigator>
  );
};

const FavouritesStack = ({navigation}: {navigation: any}) => {
  const {theme, setTheme} = React.useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Favourites"
      screenOptions={{
        headerStyle: {elevation: 0},
        cardStyle: {backgroundColor: Colors[theme].primaryBackground},
      }}>
      <Stack.Screen
        name="Favourites"
        component={FavouritesPage}
        options={{
          title: 'Liked', //Set Header Title
          headerLeft: () => (
            <BackStructure destination={null} navigation={navigation} />
          ),
          headerStyle: {
            backgroundColor: Colors[theme].primaryHeaderBackground, //Set Header color
          },
          headerTintColor: Colors[theme].headerPrimary, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const HomeStack = ({navigation}: {navigation: any}) => {
  const {theme, setTheme} = React.useContext(ThemeContext);
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomePage}
        options={{
          headerTitleAlign: 'center',
          title: 'TOP Pick', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: Colors[theme].primaryHeaderBackground, //Set Header color
          },
          headerTintColor: Colors[theme].headerPrimary, //Set Header text color
          headerTitleStyle: {
            fontWeight: Dimensions.fontThin, //Set Header text style
          },
        }}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Questions"
        component={QuestionsStack}
      />
    </Stack.Navigator>
  );
};

const SearchStack = ({navigation}: {navigation: any}) => {
  const {theme, setTheme} = React.useContext(ThemeContext);
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={SearchPage}
        options={{
          headerTitleAlign: 'center',
          title: 'Search', //Set Header Title
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Questions"
        component={QuestionsStack}
      />
    </Stack.Navigator>
  );
};

const QuestionsStack = ({navigation}: {navigation: any}) => {
  const {theme, setTheme} = React.useContext(ThemeContext);
  return (
    <Stack.Navigator initialRouteName="QuestionsScreen">
      <Stack.Screen
        name="QuestionsScreen"
        component={QuestionsPage}
        options={{
          title: 'Questions', //Set Header Title
          headerLeft: () => (
            <BackStructure navigation={navigation} destination={null} />
          ),
          headerStyle: {
            backgroundColor: Colors[theme].primaryHeaderBackground, //Set Header color
          },
          headerTintColor: Colors[theme].headerPrimary, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />

      <Stack.Screen
        name="Order"
        component={OrderPage}
        options={{
          title: 'Arrange Your Questions', //Set Header Title
          headerLeft: () => (
            <BackStructure
              destination="QuestionsScreen"
              navigation={navigation}
            />
          ),
          headerStyle: {
            backgroundColor: Colors[theme].primaryHeaderBackground, //Set Header color
          },
          headerTintColor: Colors[theme].headerPrimary, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />

      <Stack.Screen
        name="Presentation"
        component={PresentationPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const RecentsStack = ({navigation}: {navigation: any}) => {
  const {theme, setTheme} = React.useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Recents"
      screenOptions={{
        headerShown: false,
        headerStyle: {elevation: 0},
        cardStyle: {backgroundColor: Colors[theme].primaryBackground},
      }}>
      /*{' '}
      <Stack.Screen
        name="Recents"
        component={RecentsPage}
        options={{
          headerTitleAlign: 'center',
          title: 'Recents', //Set Header Title
          headerStyle: {
            backgroundColor: Colors[theme].primaryHeaderBackground, //Set Header color
          },
          headerTintColor: Colors[theme].headerPrimary, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      */
    </Stack.Navigator>
  );
};

export {
  HomeStack,
  CategoriesStack,
  FavouritesStack,
  SearchStack,
  QuestionsStack,
};
