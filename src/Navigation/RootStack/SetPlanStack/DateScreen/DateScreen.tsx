import { Image, ImageStyle, ScrollView, StatusBar, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Controller, useFormContext } from "react-hook-form";
import createCustomTheme from "../../../../utils/createCustomTheme";
import { testIDs } from "../../../../resources/testIDs";
import CustomButton from "../../../../Components/Common/Buttons/CustomButton";
import { workoutScreenPushAction } from "../../../navigationActionCreators";
import { SetPlanStackNavigation } from "../index";
import Header from "../../../../Components/Common/Header";
import CustomText from "../../../../Components/Common/CustomText";
import CustomDatePicker from "../../../../Components/Common/CustomDatePicker";
import { selectUser } from "../../../../store/user/Selectors";
import { setDueDate } from "../../../../store/user/Actions";
import { t } from "../../../../utils/translationUtil";
import { AppDispatch } from "../../../../store";

interface FormValues {
  dueDate: Date;
}

function DateScreen() {
  const { dueDate: isoString, name } = useSelector(selectUser);

  const dueDate = useMemo<Date>(() => {
    if (isoString !== null && isoString !== undefined && isoString !== "") return new Date(isoString);
    return new Date();
  }, [isoString]);

  const {
    // @ts-ignore
    updateSchema,
    reset,
    control,
    handleSubmit,
    formState: {
      errors,
      dirtyFields: { dueDate: dueDateIsDirty },
      isValid,
    },
  } = useFormContext<FormValues>();

  const validationSchema = yup.object<FormValues>().shape({
    dueDate: yup.date().test({
      name: "test",
      test: () => !!dueDateIsDirty,
      message: `${t("errors.dueDateRequired")}`,
    }),
  });

  useEffect(() => {
    reset((values: FormValues) => ({
      ...values,
      dueDate,
    }));
    updateSchema(validationSchema);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dueDate]);

  const storeDispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigation = useNavigation<SetPlanStackNavigation>();

  const onNavigateToWorkoutScreen = useCallback(() => {
    navigation.dispatch(workoutScreenPushAction());
  }, [navigation]);

  const onSubmit = () => {
    onNavigateToWorkoutScreen();
  };

  return (
    <View testID={testIDs.date.id} style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0)" />
      <Header containerStyle={styles.header} />
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <Image source={require("@assets/images/due-date-background-image.jpg")} style={styles.image} />
        <CustomText text={`${t("date.title")}, ${name}?`} variant="titleTopNav" style={styles.title} />
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange, value } }) => {
            return (
              <CustomDatePicker
                testID={testIDs.date.datePicker.id}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                date={value || dueDate}
                setDate={(newDate: Date) => {
                  onChange(newDate);
                  storeDispatch(setDueDate(newDate.toISOString()));
                }}
                containerStyle={styles.datePicker}
                error={errors?.dueDate}
              />
            );
          }}
        />
      </ScrollView>
      <CustomButton
        testID={testIDs.date.ctaButton.id}
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
  scrollViewContentContainer: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  datePicker: ViewStyle;
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
  datePicker: {
    marginTop: theme.spacing.m,
  },
  ctaButton: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignSelf: "center",
  },
});

export default DateScreen;
