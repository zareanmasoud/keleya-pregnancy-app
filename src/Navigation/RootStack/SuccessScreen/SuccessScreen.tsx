import { ImageBackground, ImageStyle, StatusBar, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import React from "react";
import createCustomTheme from "../../../utils/createCustomTheme";
import { testIDs } from "../../../resources/testIDs";
import CustomButton from "../../../Components/Common/Buttons/CustomButton";
import CustomText from "../../../Components/Common/CustomText";
import CustomLink from "../../../Components/Common/Buttons/CustomLink";
import { t } from "../../../utils/translationUtil";

function SuccessScreen() {
  return (
    <View testID={testIDs.success.id} style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0)" />
      <ImageBackground
        source={require("@assets/images/notifications-background-image.jpg")}
        style={styles.imageBackground}
        resizeMode="cover"
      />
      <View style={styles.iconContainer}>
        <FontAwesome6 name="bell" color={theme.colors.typographyTertiary} size={80} style={styles.bellIcon} />
        <CustomText text={t("success.title")} variant="titleTopNav" style={styles.title} numberOfLines={2} />
      </View>
      <View style={styles.buttonsContainer}>
        <CustomLink
          testID={testIDs.success.skipButton.id}
          onPress={() => {}}
          text={t("success.skipButton")}
          style={styles.skipButton}
        />
        <CustomButton
          testID={testIDs.success.ctaButton.id}
          onPress={() => {}}
          text={t("success.cta")}
          containerStyle={styles.ctaButton}
        />
      </View>
    </View>
  );
}

const theme = createCustomTheme();

interface Styles {
  container: ViewStyle;
  imageBackground: ImageStyle;
  iconContainer: ViewStyle;
  bellIcon: ImageStyle;
  title: TextStyle;
  buttonsContainer: ViewStyle;
  ctaButton: ViewStyle;
  skipButton: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  iconContainer: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
  },
  bellIcon: {
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    color: theme.colors.typographySecondary,
    width: 250,
    marginTop: theme.spacing.xs,
  },
  buttonsContainer: {
    flex: 1,
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  skipButton: {
    alignSelf: "center",
    marginBottom: theme.spacing.m,
  },
  ctaButton: {},
});

export default SuccessScreen;
