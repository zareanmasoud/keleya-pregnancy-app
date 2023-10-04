import React from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import createCustomTheme from "../../../utils/createCustomTheme";
import { TextVariant } from "../../../utils/textVariants";

interface Props {
  testID?: string;
  text: string;
  variant: TextVariant;
  style?: StyleProp<ViewStyle> | undefined;
  onPress?: (event: GestureResponderEvent) => void;
  numberOfLines?: number;
}

function CustomText({ testID = undefined, text, variant, style = {}, ...rest }: Props) {
  const theme = createCustomTheme();

  return (
    <Text testID={testID} style={[styles.text, theme.textVariants[variant], style]} {...rest}>
      {text}
    </Text>
  );
}

interface Styles {
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  text: {
    alignSelf: "flex-start",
  },
});

export default CustomText;
