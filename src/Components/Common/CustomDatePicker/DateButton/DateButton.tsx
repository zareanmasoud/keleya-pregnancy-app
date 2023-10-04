import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { useMemo } from "react";
import * as RNLocalize from "react-native-localize";
import CustomText from "../../CustomText";
import createCustomTheme from "../../../../utils/createCustomTheme";
import colors from "../../../../utils/colors";
import LanguageUtils from "../../../../resources/locales/LanguageUtils";

interface Props {
  testID?: string;
  date: Date;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle> | undefined;
}

function DateButton({ testID = undefined, date, onPress, containerStyle = {} }: Props) {
  const locale = RNLocalize.findBestLanguageTag(LanguageUtils.germanLocales);
  const dateText = useMemo<string>(() => {
    return date.toLocaleDateString(locale?.languageTag || "en", { month: "short", day: "numeric", year: "numeric" });
  }, [date, locale?.languageTag]);

  return (
    <TouchableOpacity testID={testID} onPress={onPress} style={[styles.container, containerStyle]}>
      <CustomText text={dateText} variant="body" style={styles.text} />
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
    backgroundColor: colors.primary100,
    borderRadius: theme.spacing.xxs,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  text: {
    color: colors.facebookBlue,
  },
});

export default DateButton;
