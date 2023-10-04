import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import React from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import createCustomTheme from "../../../utils/createCustomTheme";
import { testIDs } from "../../../resources/testIDs";

const theme = createCustomTheme();

interface Props {
  hasBackButton?: boolean;
  containerStyle?: StyleProp<ViewStyle> | undefined;
}

function Header({ hasBackButton = true, containerStyle = {} }: Props) {
  const navigation = useNavigation();

  return (
    <View testID={testIDs.header.id} style={[styles.container, containerStyle]}>
      {hasBackButton && (
        <FontAwesome6
          testID={testIDs.header.backButton.id}
          name="left-long"
          onPress={() => navigation.dispatch(StackActions.pop())}
          color={theme.colors.typography}
          size={theme.iconSize.s}
          style={styles.backButton}
        />
      )}
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  backButton: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  backButton: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
  },
});

export default Header;
