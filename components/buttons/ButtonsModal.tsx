import * as React from "react";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Colors from "../../constants/Colors";
import ThemeContext from "../../context/ThemeContext";
import { Text } from "native-base";
import Dimensions from "../../constants/Dimensions";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import CustomButton from "./CustomButton";

interface ButtonsModalProps {
  isActive: boolean;
  onHide: Function;
  title: string;
  data: Data[];
  onPress(name: string): void;
  color: string;
  backgroundColor: string;
}
interface Data {
  key: number;
  id: number;
  name: string;
  function: string;
}

const ButtonsModal = (props: ButtonsModalProps) => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    containerContent: {
      backgroundColor: props.backgroundColor,
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    containerHeader: {
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: props.backgroundColor,
    },
    headerContent: {
      padding: 5,
      paddingBottom: 20,
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 80,
      justifyContent: "center",
      alignItems: "center",
    },
    Modal: {
      backgroundColor: props.backgroundColor,
      paddingTop: 50,
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: Dimensions.bottomModalHeight,
    },
    headerText: {
      fontWeight: "bold",
      textAlign: "center",
      paddingTop: 20,
      paddingBottom: 10,
      fontSize: Dimensions.fontMed,
      color: Colors[theme].primaryText,
    },
  });

  return (
    <View style={{ position: "relative" }}>
      <SwipeUpDownModal
        modalVisible={props.isActive}
        PressToanimate={true}
        //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
        ContentModal={
          <View style={styles.containerContent}>
            <FlatList
              data={props.data}
              renderItem={({ item }: { item: Data }) => (
                <View
                  style={{
                    width: Dimensions.SCREEN_WIDTH * 0.8,
                    marginBottom: 5,
                  }}
                >
                  <CustomButton
                    title={item.name}
                    onPress={() => props.onPress(item.function)}
                    color={Colors[theme].primaryOrange}
                  />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        }
        HeaderStyle={styles.headerContent}
        HeaderContent={
          <TouchableWithoutFeedback onPress={() => props.onHide()}>
            <View style={{ width: Dimensions.SCREEN_WIDTH }}>
              <Text style={styles.headerText}>{props.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        }
        ContentModalStyle={styles.Modal}
        onClose={() => {
          props.onHide();
        }}
      />
    </View>
  );
};

export default ButtonsModal;
