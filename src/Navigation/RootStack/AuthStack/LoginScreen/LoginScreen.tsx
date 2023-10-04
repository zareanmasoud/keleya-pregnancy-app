import {
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import createCustomTheme from "../../../../utils/createCustomTheme";
import { testIDs } from "../../../../resources/testIDs";
import CustomButton from "../../../../Components/Common/Buttons/CustomButton";
import CustomLink from "../../../../Components/Common/Buttons/CustomLink";
import { successScreenPushAction } from "../../../navigationActionCreators";
import { AuthStackNavigation } from "../index";
import Header from "../../../../Components/Common/Header";
import CustomText from "../../../../Components/Common/CustomText";
import CustomTextInput from "../../../../Components/Common/CustomTextInput";
import { setLoginPassword, setLoginUsername } from "../../../../context/auth/Actions";
import { useAuthContext } from "../../../../context/auth/Context";
import { setIsLoggedIn } from "../../../../store/user/Actions";
import { t } from "../../../../utils/translationUtil";
import { AppDispatch } from "../../../../store";

interface FormValues {
  username: string;
  password: string;
}

function LoginScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const storeDispatch = useDispatch<AppDispatch>();

  const [{ loginUsername, loginPassword }, dispatch] = useAuthContext();

  const navigation = useNavigation<AuthStackNavigation>();

  const validationSchema = yup.object<FormValues>().shape({
    username: yup.string().required(t("errors.usernameRequired")).email(t("errors.email")),
    password: yup
      .string()
      .required(t("errors.passwordRequired"))
      .min(8, t("errors.passwordMinimum"))
      .matches(/[a-zA-Z]/, t("errors.passwordLetters")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(validationSchema),
    defaultValues: {
      username: loginUsername,
      password: loginPassword,
    },
  });

  const onNavigateToSuccessScreen = useCallback(() => {
    navigation.dispatch(successScreenPushAction());
  }, [navigation]);

  const onSubmit = () => {
    storeDispatch(setIsLoggedIn(true));
    onNavigateToSuccessScreen();
  };

  return (
    <View testID={testIDs.login.id} style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0)" />
      <Header containerStyle={styles.header} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.select({
          ios: "padding",
          android: undefined,
        })}
        keyboardVerticalOffset={0}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          <Image source={require("@assets/images/authentication-background-image.jpg")} style={styles.image} />
          <CustomText text={t("login.title")} variant="titleTopNav" style={styles.title} />
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <CustomTextInput
                  testID={testIDs.login.usernameInput.id}
                  value={value}
                  setValue={(val) => {
                    onChange(val);
                    dispatch(setLoginUsername(val));
                  }}
                  placeholder={t("login.usernamePlaceholder")}
                  containerStyle={styles.usernameInput}
                  onBlur={onBlur}
                  error={errors?.username}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <CustomTextInput
                  testID={testIDs.login.passwordInput.id}
                  type="password"
                  value={value}
                  setValue={(val) => {
                    onChange(val);
                    dispatch(setLoginPassword(val));
                  }}
                  placeholder={t("login.passwordPlaceholder")}
                  isPasswordVisible={isPasswordVisible}
                  setIsPasswordVisible={() => setIsPasswordVisible(!isPasswordVisible)}
                  containerStyle={styles.passwordInput}
                  onBlur={onBlur}
                  error={errors?.password}
                />
              );
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomLink
        testID={testIDs.login.forgotPasswordButton.id}
        onPress={() => {}}
        text={t("login.forgotPasswordButton")}
        style={styles.forgotPasswordButton}
        type="link2"
      />
      <CustomButton
        testID={testIDs.login.ctaButton.id}
        onPress={handleSubmit(onSubmit)}
        text={t("login.cta")}
        containerStyle={styles.ctaButton}
        active={isValid}
      />
    </View>
  );
}

const theme = createCustomTheme();

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  keyboardAvoidingView: ViewStyle;
  scrollViewContentContainer: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  usernameInput: ViewStyle;
  passwordInput: ViewStyle;
  forgotPasswordButton: TextStyle;
  ctaButton: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 40,
    left: 0,
    zIndex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.surface,
    paddingBottom: 180,
  },
  image: {
    width: "100%",
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    color: theme.colors.typographySecondary,
    marginHorizontal: theme.spacing.l,
  },
  usernameInput: {
    marginTop: theme.spacing.s,
  },
  passwordInput: {
    marginTop: theme.spacing.s,
  },
  forgotPasswordButton: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    alignSelf: "center",
    textAlign: "center",
  },
  ctaButton: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignSelf: "center",
  },
});

export default LoginScreen;
