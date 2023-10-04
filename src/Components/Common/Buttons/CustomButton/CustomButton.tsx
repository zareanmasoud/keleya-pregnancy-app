import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { GestureResponderEvent } from "react-native/Libraries/Types/CoreEventTypes";
import React from "react";
import CustomText from "../../CustomText";
import createCustomTheme from "../../../../utils/createCustomTheme";
import colors from "../../../../utils/colors";

interface Props {
  testID?: string;
  onPress: (event: GestureResponderEvent | React.BaseSyntheticEvent | undefined) => void | Promise<void>;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  style?: StyleProp<TextStyle> | undefined;
  text: string;
  disabled?: boolean;
  active?: boolean;
}

function CustomButton({
  testID = undefined,
  onPress,
  containerStyle = {},
  style = {},
  text,
  disabled = false,
  active = true,
}: Props) {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={(event) => void onPress(event)}
      style={[styles.container, containerStyle, { backgroundColor: active ? colors.PALE_TEAL : colors.WARM_GREY }]}
      disabled={disabled}
    >
      <CustomText text={text} variant="h5" style={[styles.text, style]} />
    </TouchableOpacity>
  );
}

const theme = createCustomTheme();

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexGrow: 1,
    marginHorizontal: theme.spacing.l,
    borderRadius: theme.spacing.xxs,
    alignItems: "center",
    maxHeight: theme.spacing.xl,
  },
  text: {
    color: colors.white,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: 50,
    alignSelf: "center",
  },
});

export default CustomButton;
