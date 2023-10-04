import CheckBox from "@react-native-community/checkbox";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { GlobalError } from "react-hook-form";
import React from "react";
import CustomText from "../CustomText";
import createCustomTheme from "../../../utils/createCustomTheme";
import HintText from "../HintText";

interface Props {
  testID?: string;
  value: boolean;
  setValue: (val: boolean) => void;
  label: string;
  numberOfLines?: number;
  disabled?: boolean;
  boxType?: "circle" | "square";
  onAnimationType?: "fill" | "stroke" | "flat" | "fade" | "bounce" | "one-stroke" | undefined;
  offAnimationType?: "fill" | "stroke" | "flat" | "fade" | "bounce" | "one-stroke" | undefined;
  size?: number;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  error?: GlobalError | undefined;
}

function CustomCheckBox({
  testID = undefined,
  value,
  setValue,
  label,
  numberOfLines = 1,
  disabled = false,
  boxType = "square",
  onAnimationType = "stroke",
  offAnimationType = "stroke",
  size = 20,
  containerStyle = {},
  error = undefined,
}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.checkBoxAndLabelContainer}>
        <CheckBox
          testID={testID}
          value={value}
          onValueChange={setValue}
          disabled={disabled}
          boxType={boxType}
          onAnimationType={onAnimationType}
          offAnimationType={offAnimationType}
          style={{ width: size, height: size }}
        />
        <CustomText text={label} variant="captions1" numberOfLines={numberOfLines} style={styles.label} />
      </View>
      {error?.type && <HintText message={error.message || ""} />}
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  checkBoxAndLabelContainer: ViewStyle;
  label: TextStyle;
}

const theme = createCustomTheme();

const styles = StyleSheet.create<Styles>({
  container: {
    marginVertical: theme.spacing.xs,
    marginHorizontal: theme.spacing.l,
  },
  checkBoxAndLabelContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    marginStart: theme.spacing.xs,
    marginTop: 2,
  },
});
export default CustomCheckBox;
