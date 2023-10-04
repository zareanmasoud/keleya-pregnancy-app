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
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import createCustomTheme from "../../../../utils/createCustomTheme";
import { testIDs } from "../../../../resources/testIDs";
import CustomButton from "../../../../Components/Common/Buttons/CustomButton";
import { setPlanStackPushAction } from "../../../navigationActionCreators";
import { AuthStackNavigation } from "../index";
import Header from "../../../../Components/Common/Header";
import CustomText from "../../../../Components/Common/CustomText";
import CustomTextInput from "../../../../Components/Common/CustomTextInput";
import { useAuthContext } from "../../../../context/auth/Context";
import {
  setSignUpPassword,
  setSignUpUsername,
  setPrivacyPolicyCheck,
  setTermsAndConditionsCheck,
} from "../../../../context/auth/Actions";
import CustomCheckBox from "../../../../Components/Common/CustomCheckBox";
import { setIsLoggedIn } from "../../../../store/user/Actions";
import { t } from "../../../../utils/translationUtil";
import { AppDispatch } from "../../../../store";

interface FormValues {
  username: string;
  password: string;
  privacyPolicy: boolean;
  termsAndConditions: boolean;
}

function SignUpScreen() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const storeDispatch = useDispatch<AppDispatch>();

  const [{ signUpUsername, signUpPassword, privacyPolicyCheck, termsAndConditionsCheck }, dispatch] = useAuthContext();

  const navigation = useNavigation<AuthStackNavigation>();

  const validationSchema = yup.object<FormValues>().shape({
    username: yup.string().required(t("errors.usernameRequired")).email(t("errors.email")),
    password: yup
      .string()
      .required(t("errors.passwordRequired"))
      .min(8, t("errors.passwordMinimum"))
      .matches(/[a-zA-Z0-9]/, t("errors.passwordLetters")),
    privacyPolicy: yup.boolean().required().isTrue(t("errors.privacyPolicyRequired")),
    termsAndConditions: yup.boolean().required().isTrue(t("errors.termsAndConditionsRequired")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(validationSchema),
    defaultValues: {
      username: signUpUsername,
      password: signUpPassword,
      privacyPolicy: privacyPolicyCheck,
      termsAndConditions: termsAndConditionsCheck,
    },
  });

  const onNavigateToPlanStack = useCallback(() => {
    navigation.dispatch(setPlanStackPushAction());
  }, [navigation]);

  const onSubmit = () => {
    storeDispatch(setIsLoggedIn(true));
    onNavigateToPlanStack();
  };

  return (
    <View testID={testIDs.signUp.id} style={styles.container}>
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
          <CustomText text={t("signUp.title")} variant="titleTopNav" style={styles.title} />
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <CustomTextInput
                  testID={testIDs.signUp.usernameInput.id}
                  value={value}
                  setValue={(val) => {
                    onChange(val);
                    dispatch(setSignUpUsername(val));
                  }}
                  placeholder={t("signUp.usernamePlaceholder")}
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
                  testID={testIDs.signUp.passwordInput.id}
                  type="password"
                  value={value}
                  setValue={(val) => {
                    onChange(val);
                    dispatch(setSignUpPassword(val));
                  }}
                  placeholder={t("signUp.passwordPlaceholder")}
                  isPasswordVisible={isPasswordVisible}
                  setIsPasswordVisible={() => setIsPasswordVisible(!isPasswordVisible)}
                  containerStyle={styles.passwordInput}
                  onBlur={onBlur}
                  error={errors?.password}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="privacyPolicy"
            render={({ field: { onChange, value } }) => {
              return (
                <CustomCheckBox
                  testID={testIDs.signUp.privacyPolicyCheck.id}
                  value={value}
                  setValue={(val) => {
                    onChange(val);
                    dispatch(setPrivacyPolicyCheck(val));
                  }}
                  label={t("signUp.privacyPolicyCheck")}
                  containerStyle={styles.privacyPolicyCheck}
                  error={errors?.privacyPolicy}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="termsAndConditions"
            render={({ field: { onChange, value } }) => {
              return (
                <CustomCheckBox
                  testID={testIDs.signUp.termsAndConditionsCheck.id}
                  value={value}
                  setValue={(val) => {
                    onChange(val);
                    dispatch(setTermsAndConditionsCheck(val));
                  }}
                  label={t("signUp.termsAndConditionsCheck")}
                  numberOfLines={2}
                  containerStyle={styles.termsAndConditionsCheck}
                  error={errors?.termsAndConditions}
                />
              );
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton
        onPress={handleSubmit(onSubmit)}
        text={t("signUp.cta")}
        testID={testIDs.signUp.ctaButton.id}
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
  privacyPolicyCheck: ViewStyle;
  termsAndConditionsCheck: ViewStyle;
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
  privacyPolicyCheck: {
    marginTop: theme.spacing.s,
  },
  termsAndConditionsCheck: {
    marginTop: theme.spacing.xs,
  },
  ctaButton: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignSelf: "center",
  },
});

export default SignUpScreen;
