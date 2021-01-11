import React from 'react';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  iconName: string;
  isCurrent?: boolean;
};
export const BottomMenuItem = ({iconName, isCurrent}: Props) => {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AntDesign
        name={iconName}
        size={32}
        style={{color: isCurrent ? 'blue' : 'grey'}}
      />
    </View>
  );
};
