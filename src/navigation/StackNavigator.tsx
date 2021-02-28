import * as React from 'react';
import {View, Image, TouchableOpacity, Button, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../screens/HomePage';
import CategoriesPage from '../screens/CategoriesPage';
import ThemeContext from '../context/ThemeContext';
import TopicsPage from '../screens/TopicsPage';
import QuestionsPage from '../screens/QuestionsPage';
import OrderPage from '../screens/OrderPage';
import {LocalizationContext} from '../context/LocalizationContext';
import IconBack from 'react-native-vector-icons/MaterialIcons';
import MenuIcon from 'react-native-vector-icons/MaterialIcons';
import IconUpdate from 'react-native-vector-icons/Ionicons';
import IconChecked from 'react-native-vector-icons/Ionicons';

import {Container, Header, Content, Spinner, Text} from 'native-base';
import FavouritesPage from '../screens/FavouritesPage';
import SearchPage from '../screens/SearchPage';
import PresentationPage from '../screens/PresentationPage';
import AwesomeAlert from 'react-native-awesome-alerts';
import {getColor} from '../constants/Themes';
import Dimensions from '../constants/Dimensions';
import SettingsPage from '../screens/SettingsPage';
import UpdateContext from '../context/UpdateContext';
import {updateTopics} from '../utils/api';
import {getLastUpdate, getStoredLanguage, isConnected} from '../utils/utils';
import SelectLanguagePage from '../screens/SettingsLanguagePage';
import ThemePage from '../screens/SettingsThemePage';

const Stack = createStackNavigator();

const NavigationDrawerStructure = (props: any) => {
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);

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
          color={getColor(theme, 'headerPrimary')}
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
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);

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
          color={getColor(theme, 'secondaryIcon')}
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
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="CategoriesScreen">
      <Stack.Screen
        name="CategoriesScreen"
        component={CategoriesPage}
        options={{
          title: translations.CATEGORIES,
          headerTintColor: getColor(theme, 'headerPrimary'),

          headerLeft: () => (
            <BackStructure destination={null} navigation={navigation} />
          ),
          headerStyle: {
            backgroundColor: getColor(theme, 'primaryHeaderBackground'),
          },

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Topics"
        component={TopicsPage}
        options={{
          title: 'Topics',
          headerTintColor: getColor(theme, 'headerPrimary'),

          headerStyle: {
            backgroundColor: getColor(theme, 'primaryHeaderBackground'),
          },

          headerTitleStyle: {
            fontWeight: 'bold',
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
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator
      initialRouteName="Favourites"
      screenOptions={{
        headerStyle: {elevation: 0},
        cardStyle: {backgroundColor: getColor(theme, 'primaryBackground')},
      }}>
      <Stack.Screen
        name="Favourites"
        component={FavouritesPage}
        options={{
          title: translations.FAVOURITES,
          headerTintColor: getColor(theme, 'headerPrimary'),

          headerLeft: () => (
            <BackStructure destination={null} navigation={navigation} />
          ),
          headerStyle: {
            backgroundColor: getColor(theme, 'primaryHeaderBackground'),
          },

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = ({navigation}: {navigation: any}) => {
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {elevation: 0},
        cardStyle: {backgroundColor: getColor(theme, 'primaryBackground')},
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          title: translations.SETTINGS,
          headerTintColor: getColor(theme, 'headerPrimary'),

          headerLeft: () => (
            <BackStructure destination={null} navigation={navigation} />
          ),
          headerStyle: {
            backgroundColor: getColor(theme, 'primaryHeaderBackground'),
          },

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Language"
        component={SelectLanguagePage}
        options={{
          title: translations.SELECT_LANGUAGE,
          headerTintColor: getColor(theme, 'headerPrimary'),

          headerStyle: {
            backgroundColor: getColor(theme, 'primaryHeaderBackground'),
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <BackStructure destination="Settings" navigation={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="Theme"
        component={ThemePage}
        options={{
          title: translations.CHANGE_THEME,
          headerTintColor: getColor(theme, 'headerPrimary'),

          headerStyle: {
            backgroundColor: getColor(theme, 'primaryHeaderBackground'),
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <BackStructure destination="Settings" navigation={navigation} />
          ),
          headerRight: () => (
            <IconChecked
              name="checkmark-done"
              color="#fff"
              onPress={() => {}}
              size={Dimensions.iconMed}
              style={{
                marginRight: 20,
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const renderConnectivityIcon = (
  isLoadingContent: boolean,
  isUpdated: boolean,
  iconColor: string,
  setLoadingContent: (val: boolean) => void,
  setUpdatedContent: (val: boolean) => void,
  setUpdatedAlert: (val: boolean) => void,
): any => {
  console.log('laoding', isLoadingContent);

  if (isLoadingContent) {
    return <Spinner color="white" size="small" style={{marginRight: 20}} />;
  }

  if (isUpdated) {
    return (
      <IconChecked
        name="checkmark-done"
        color={iconColor}
        onPress={() => {
          setUpdatedAlert(true);
        }}
        size={Dimensions.iconMed}
        style={{
          marginRight: 20,
        }}
      />
    );
  } else {
    return (
      <IconUpdate
        name="reload"
        color={iconColor}
        onPress={async () =>
          (await isConnected()) &&
          updateTopics(
            await getLastUpdate(),
            await getStoredLanguage(),
            setUpdatedContent,
            setLoadingContent,
          )
        }
        size={Dimensions.iconMedSmall}
        style={{
          marginRight: 20,
        }}
      />
    );
  }
};

const HomeStack = ({navigation}: {navigation: any}) => {
  const {theme} = React.useContext(ThemeContext);
  const {
    isLoadingContent,
    setLoadingContent,
    isUpdatedContent,
    setUpdatedContent,
  } = React.useContext(UpdateContext);

  const [isUpdatedAlert, setUpdatedAlert] = React.useState<boolean>(false);
  const {translations} = React.useContext(LocalizationContext);
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomePage}
        options={{
          headerTitleAlign: 'center',
          title: isLoadingContent ? 'updating topics...' : 'TOP Picks',
          headerTintColor: getColor(theme, 'headerPrimary'),
          headerRight: () => (
            <View>
              {isLoadingContent && (
                <AwesomeAlert
                  show={isLoadingContent}
                  showProgress={isLoadingContent}
                  progressColor={getColor(theme, 'primaryOrange')}
                  title={translations.UPDATING_QUESTIONS + '...'}
                  titleStyle={{color: getColor(theme, 'primaryOrange')}}
                  closeOnTouchOutside={false}
                  progressSize={50}
                  message={translations.WAIT_UPDATE}
                  closeOnHardwareBackPress={false}
                  showCancelButton={false}
                  messageStyle={{textAlign: 'center'}}
                  cancelButtonColor={getColor(theme, 'primaryOrange')}
                  onCancelPressed={() => {}}
                  onConfirmPressed={() => {}}
                />
              )}
              {isUpdatedAlert && (
                <AwesomeAlert
                  show={isUpdatedAlert}
                  showProgress={false}
                  titleStyle={{color: getColor(theme, 'primaryOrange')}}
                  title="Top Picks"
                  message="All The topics are syncronized!"
                  closeOnTouchOutside={true}
                  onDismiss={() => setUpdatedAlert(false)}
                  closeOnHardwareBackPress={false}
                  messageStyle={{textAlign: 'center'}}
                  cancelText="No,Cancel"
                  confirmText="Ok,Delete"
                />
              )}
              {renderConnectivityIcon(
                isLoadingContent,
                isUpdatedContent,
                getColor(theme, 'secondaryIcon'),
                setLoadingContent,
                setUpdatedContent,
                setUpdatedAlert,
              )}
            </View>
          ),
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: getColor(theme, 'primaryHeaderBackground'),
          },

          headerTitleStyle: {
            fontWeight: '100',
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
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={SearchPage}
        options={{
          headerTitleAlign: 'center',
          title: translations.SEARCH,
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
  const {theme} = React.useContext(ThemeContext);
  const {translations} = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="QuestionsScreen">
      <Stack.Screen
        name="QuestionsScreen"
        component={QuestionsPage}
        options={{
          title: translations.QUESTIONS,
          headerTintColor: getColor(theme, 'headerPrimary'),
          headerLeft: () => (
            <BackStructure navigation={navigation} destination={null} />
          ),
          headerStyle: {
            backgroundColor: getColor(theme, 'primaryHeaderBackground'),
          },

          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Order"
        component={OrderPage}
        options={{
          title: translations.ARRANGE_QUESTIONS,
          headerTintColor: getColor(theme, 'headerPrimary'),
          headerLeft: () => (
            <BackStructure
              destination="QuestionsScreen"
              navigation={navigation}
            />
          ),
          headerStyle: {
            backgroundColor: getColor(theme, 'primaryHeaderBackground'),
          },

          headerTitleStyle: {
            fontWeight: 'bold',
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

export {
  HomeStack,
  CategoriesStack,
  FavouritesStack,
  SearchStack,
  QuestionsStack,
  SettingsStack,
};
