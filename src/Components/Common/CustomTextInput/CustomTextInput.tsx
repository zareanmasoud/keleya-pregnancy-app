import React, { Dispatch, useMemo, useRef } from "react";
import { StyleSheet, TextInput, View, ViewStyle, TextStyle, StyleProp, Platform } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { GlobalError } from "react-hook-form";
import createCustomTheme from "../../../utils/createCustomTheme";
import colors from "../../../utils/colors";
import HintText from "../HintText";

type InputType = "general" | "password";
type PlaceholderPosition = "start" | "center";

interface Props {
  testID?: string;
  type?: InputType | undefined;
  value: string;
  setValue: Dispatch<string>;
  placeholder?: string;
  isPasswordVisible?: boolean;
  setIsPasswordVisible?: () => void;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  placeholderPosition?: PlaceholderPosition | undefined;
  onBlur?: () => void | undefined;
  error?: GlobalError | undefined;
}

function CustomTextInput({
  testID = undefined,
  type = "general",
  value,
  setValue,
  placeholder = "",
  isPasswordVisible = false,
  setIsPasswordVisible = () => {},
  containerStyle = {},
  placeholderPosition = "start",
  onBlur = () => {},
  error = undefined,
}: Props) {
  const textInputRef = useRef<TextInput | null>(null);

  const inputStyle = useMemo<ViewStyle | TextStyle>(() => {
    if (placeholderPosition === "start")
      return {
        textAlign: "left",
        marginLeft: theme.spacing.m,
      };
    return {
      textAlign: "center",
      marginLeft: 0,
    };
  }, [placeholderPosition]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <TextInput
          testID={testID}
          ref={textInputRef}
          style={[styles.input, inputStyle]}
          placeholder={
            Platform.OS === "android" &&
            placeholderPosition === "center" &&
            (textInputRef?.current?.isFocused() || value !== "")
              ? undefined
              : placeholder
          }
          value={value}
          onChangeText={setValue}
          onBlur={onBlur}
          {...(type === "password" ? { secureTextEntry: !isPasswordVisible } : {})}
        />
        {type === "password" && (
          <FontAwesome6
            name={isPasswordVisible ? "eye-slash" : "eye"}
            onPress={setIsPasswordVisible}
            color={theme.colors.typographyTertiary}
            size={theme.iconSize.m}
            style={styles.eyeIcon}
          />
        )}
      </View>
      {error?.type && <HintText message={error.message || ""} />}
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  inputContainer: ViewStyle;
  input: ViewStyle;
  eyeIcon: TextStyle;
}

const theme = createCustomTheme();

const styles = StyleSheet.create<Styles>({
  container: {
    marginHorizontal: theme.spacing.l,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: theme.spacing.xxs,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary200,
  },
  input: {
    fontSize: 16,
    fontWeight: "500",
    flexGrow: 1,
    height: theme.spacing.l,
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: theme.spacing.xxs,
    marginEnd: theme.spacing.xs,
  },
});

export default CustomTextInput;
