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
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LinearGradient from "react-native-linear-gradient";
import { testIDs } from "../../../../resources/testIDs";
import CustomButton from "../../../../Components/Common/Buttons/CustomButton";
import { dateScreenPushAction } from "../../../navigationActionCreators";
import { SetPlanStackNavigation } from "../index";
import Header from "../../../../Components/Common/Header";
import CustomText from "../../../../Components/Common/CustomText";
import CustomTextInput from "../../../../Components/Common/CustomTextInput";
import { selectUserName } from "../../../../store/user/Selectors";
import { setName } from "../../../../store/user/Actions";
import { t } from "../../../../utils/translationUtil";
import createCustomTheme from "../../../../utils/createCustomTheme";
import { gradientColors } from "./gradientColors";
import { AppDispatch } from "../../../../store";

interface FormValues {
  name: string;
}

function NameScreen() {
  const name = useSelector(selectUserName);

  const storeDispatch = useDispatch<AppDispatch>();

  const navigation = useNavigation<SetPlanStackNavigation>();

  const validationSchema = yup.object<FormValues>().shape({
    name: yup
      .string()
      .required(t("errors.nameRequired"))
      .max(40, t("errors.nameMaximum"))
      .matches(/^[A-Za-z ]*$/, t("errors.nameValid")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver<FormValues>(validationSchema),
    defaultValues: {
      name,
    },
  });

  const onNavigateToDateScreen = useCallback(() => {
    navigation.dispatch(dateScreenPushAction());
  }, [navigation]);

  const onSubmit = () => {
    onNavigateToDateScreen();
  };

  return (
    <View testID={testIDs.name.id} style={styles.container}>
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
          <View style={styles.contentContainer}>
            <Image source={require("@assets/images/couch_smile.jpg")} style={styles.image} />
            <LinearGradient colors={gradientColors} style={styles.gradient} />
            <CustomText text={t("name.title")} variant="titleTopNav" style={styles.title} />
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <CustomTextInput
                    testID={testIDs.name.nameInput.id}
                    value={value}
                    setValue={(val) => {
                      onChange(val);
                      storeDispatch(setName(val));
                    }}
                    placeholder={t("name.namePlaceholder")}
                    containerStyle={styles.nameInput}
                    placeholderPosition="center"
                    onBlur={onBlur}
                    error={errors?.name}
                  />
                );
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton
        testID={testIDs.name.ctaButton.id}
        onPress={handleSubmit(onSubmit)}
        text={t("ctaContinue")}
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
  contentContainer: ViewStyle;
  image: ImageStyle;
  gradient: ViewStyle;
  title: TextStyle;
  nameInput: ViewStyle;
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
  contentContainer: {
    marginTop: -200,
  },
  image: {
    width: "100%",
    paddingTop: StatusBar.currentHeight,
  },
  gradient: {
    width: "100%",
    height: 180,
    top: -180,
  },
  title: {
    marginTop: -300,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 18,
    color: theme.colors.typographySecondary,
    marginHorizontal: theme.spacing.l,
  },
  nameInput: {
    marginTop: theme.spacing.s,
  },
  ctaButton: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignSelf: "center",
  },
});

export default NameScreen;
