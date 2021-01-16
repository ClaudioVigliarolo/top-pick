import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Platform,
  Keyboard,
  Dimensions as Dim,
} from 'react-native';
import Dimensions from '../constants/Dimensions';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {BottomMenuItem} from '../components/buttons/BottomMenuItem';

export const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let keyboardEventListeners: any;
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
        Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners &&
          keyboardEventListeners.forEach((eventListener) =>
            eventListener.remove(),
          );
      }
    };
  }, []);

  const style = StyleSheet.create({
    tabContainer: {
      height: Dimensions.tabHeight,
      backgroundColor: 'white',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      elevation: 10,
      position: 'absolute',
      bottom: 0,
    },
  });

  if (
    !visible ||
    !descriptors[state.routes[state.index].key].options.tabBarVisible
  )
    return null;
  return (
    <View style={[style.tabContainer, {width: '100%'}]}>
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              activeOpacity={0.95}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{flex: 1}}
              key={index}>
              <BottomMenuItem
                iconName={label.toString()}
                isCurrent={isFocused}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
