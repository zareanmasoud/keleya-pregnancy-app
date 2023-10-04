import { Image, ImageBackground, ImageStyle, StatusBar, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import createCustomTheme from "../../../../utils/createCustomTheme";
import { testIDs } from "../../../../resources/testIDs";
import CustomButton from "../../../../Components/Common/Buttons/CustomButton";
import {
  loginScreenPushAction,
  setPlanStackPushAction,
  signUpScreenPushAction,
} from "../../../navigationActionCreators";
import CustomLink from "../../../../Components/Common/Buttons/CustomLink";
import { AuthStackNavigation } from "../index";
import CustomText from "../../../../Components/Common/CustomText";
import { selectUserIsLoggedIn } from "../../../../store/user/Selectors";
import { t } from "../../../../utils/translationUtil";

function InitialScreen() {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  const navigation = useNavigation<AuthStackNavigation>();

  const onGetStartedPress = useCallback(() => {
    navigation.dispatch(signUpScreenPushAction());
  }, [navigation]);

  const onOrLoginPress = useCallback(() => {
    navigation.dispatch(loginScreenPushAction());
  }, [navigation]);

  const onContinuePress = useCallback(() => {
    navigation.dispatch(setPlanStackPushAction());
  }, [navigation]);

  return (
    <View testID={testIDs.initial.id} style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0)" />
      <ImageBackground
        source={require("@assets/images/first-intro-image.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      />
      <View style={styles.logoContainer}>
        <Image source={require("@assets/images/keleya-logo.png")} style={styles.image} />
        <CustomText text={t("initial.title")} variant="titleTopNav" style={styles.title} numberOfLines={2} />
      </View>
      <View style={styles.buttonsContainer}>
        {isLoggedIn ? (
          <CustomButton
            testID={testIDs.initial.continueButton.id}
            onPress={onContinuePress}
            text={t("ctaContinue")}
            containerStyle={styles.ctaButton}
          />
        ) : (
          <>
            <CustomButton
              testID={testIDs.initial.ctaButton.id}
              onPress={onGetStartedPress}
              text={t("initial.cta")}
              containerStyle={styles.ctaButton}
            />
            <CustomLink
              testID={testIDs.initial.loginButton.id}
              onPress={onOrLoginPress}
              text={t("initial.loginButton")}
              style={styles.loginButton}
            />
          </>
        )}
      </View>
    </View>
  );
}

const theme = createCustomTheme();

interface Styles {
  container: ViewStyle;
  imageBackground: ImageStyle;
  logoContainer: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  buttonsContainer: ViewStyle;
  ctaButton: ViewStyle;
  loginButton: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  logoContainer: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
  },
  image: {
    width: 80,
    height: undefined,
    aspectRatio: 250 / 323,
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    color: theme.colors.typographySecondary,
    width: 200,
    marginTop: theme.spacing.xs,
  },
  buttonsContainer: {
    flex: 1,
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
  },
  ctaButton: {},
  loginButton: {
    alignSelf: "center",
    marginTop: theme.spacing.xs,
  },
});

export default InitialScreen;
