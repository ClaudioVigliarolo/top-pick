import * as React from 'react';
import {
  View,
  StyleSheet,
  Text as NativeText,
  Keyboard,
  Button,
} from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import {getColor} from '../../constants/Themes';
import Dimensions from '../../constants/Dimensions';
import CustomButton from './CustomButton';
interface BottomButtonsProps {
  onPress: any;
  text: string;
  secondaryText?: string;
  visible: boolean;
  isButtonEnabled: boolean;
  isTextEnabled: boolean;
}

interface BottomButtonsState {
  isKeyboadVisible: boolean;
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.bottomButtonsHeight,
    width: '100%',
    borderTopWidth: 2,
    padding: 10,
  },

  content: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryText: {
    fontSize: Dimensions.fontMed,
    textAlign: 'center',
  },
});

export default class BottomButtons extends React.Component<
  BottomButtonsProps,
  BottomButtonsState
> {
  public keyboardDidShowListener: any;
  public keyboardDidHideListener: any;
  state = {
    isKeyboadVisible: false,
  };
  static contextType = ThemeContext;

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      isKeyboadVisible: true,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      isKeyboadVisible: false,
    });
  };

  render() {
    {
    }
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: getColor(
              this.context.theme,
              'bottomButtonsBackground',
            ),
          },

          {
            borderTopColor: getColor(this.context.theme, 'primaryBackground'),
          },
          {
            display:
              this.props.visible && !this.state.isKeyboadVisible
                ? 'flex'
                : 'none',
          },
        ]}>
        <View style={styles.content}>
          <View
            style={{
              flex: 1,
              display: this.props.isTextEnabled ? 'flex' : 'none',
            }}>
            <NativeText
              style={[
                styles.secondaryText,

                {
                  color: getColor(this.context.theme, 'primaryOrange'),
                },
              ]}>
              {this.props.secondaryText}
            </NativeText>
          </View>
          <View
            style={{
              flex: 1.2,
              justifyContent: 'center',
              maxWidth: '75%',
              display: this.props.isButtonEnabled ? 'flex' : 'none',
            }}>
            <CustomButton
              title={this.props.text}
              onPress={this.props.onPress}
              color={getColor(this.context.theme, 'primaryOrange')}
            />
          </View>
        </View>
      </View>
    );
  }
}
