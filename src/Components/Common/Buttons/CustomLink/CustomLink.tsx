import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useMemo } from "react";
import CustomText from "../../CustomText";
import createCustomTheme from "../../../../utils/createCustomTheme";
import { fontFamilies } from "../../../../utils/textVariants";

type LinkType = "general" | "underlined-link" | "link1" | "link2";
type Variant = "titleTopNav" | "body" | "captions1" | "link";

interface Props {
  type?: LinkType | undefined;
  testID?: string;
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  style?: StyleProp<ViewStyle>;
}

function CustomLink({ testID = undefined, type = "general", onPress, text, style = {} }: Props) {
  const variant = useMemo<Variant>(() => {
    switch (type) {
      case "general":
        return "titleTopNav";
      case "link1":
        return "body";
      case "link2":
        return "captions1";
      default:
        return "link";
    }
  }, [type]);

  const dynamicStyle = useMemo<TextStyle>(() => {
    switch (type) {
      case "underlined-link":
        return {
          color: theme.colors.typographyLinks,
          textDecorationLine: "underline",
        };
      case "link2":
        return {
          fontFamily: fontFamilies.bold,
          fontWeight: "600",
          color: theme.colors.typographyTertiary,
        };
      case "general":
        return {
          fontFamily: fontFamilies.bold,
          fontWeight: "600",
          fontSize: 18,
        };
      default:
        return {};
    }
  }, [type]);

  return (
    <CustomText
      testID={testID}
      text={text}
      variant={variant}
      style={[styles.text, style, dynamicStyle]}
      onPress={onPress}
    />
  );
}

const theme = createCustomTheme();

interface Styles {
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  text: {
    paddingVertical: theme.spacing.xxs,
  },
});

export default CustomLink;
