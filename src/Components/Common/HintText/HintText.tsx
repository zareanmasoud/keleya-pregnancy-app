import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import createCustomTheme from "../../../utils/createCustomTheme";

interface Props {
  message: string;
  numberOfLines?: number | undefined;
  containerStyle?: StyleProp<ViewStyle> | undefined;
}

function HintText({ message, numberOfLines = 1, containerStyle = {} }: Props) {
  return (
    <CustomText
      text={message}
      variant="captions2"
      style={[styles.text, containerStyle]}
      numberOfLines={numberOfLines}
    />
  );
}

interface Styles {
  text: TextStyle;
}

const theme = createCustomTheme();

const styles = StyleSheet.create<Styles>({
  text: {
    paddingVertical: theme.spacing.xxs,
    color: theme.colors.error,
  },
});

export default HintText;
