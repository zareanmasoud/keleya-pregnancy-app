import { Image, ImageStyle, ScrollView, StatusBar, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import createCustomTheme from "../../../../utils/createCustomTheme";
import { testIDs } from "../../../../resources/testIDs";
import CustomButton from "../../../../Components/Common/Buttons/CustomButton";
import { successScreenPushAction } from "../../../navigationActionCreators";
import { SetPlanStackNavigation } from "../index";
import Header from "../../../../Components/Common/Header";
import CustomText from "../../../../Components/Common/CustomText";
import CustomPicker from "../../../../Components/Common/CustomPicker";
import { usePicker } from "../../../../hooks/usePicker";
import { selectUserWorkoutFrequency } from "../../../../store/user/Selectors";
import { setWorkoutFrequency } from "../../../../store/user/Actions";
import { t } from "../../../../utils/translationUtil";
import { AppDispatch } from "../../../../store";

function WorkoutScreen() {
  const navigation = useNavigation<SetPlanStackNavigation>();

  const workoutFrequency: number = useSelector(selectUserWorkoutFrequency) || 3;

  const selectedWorkoutFrequency = useMemo<number>(() => {
    if (workoutFrequency !== null && workoutFrequency !== undefined) return workoutFrequency;
    return 3;
  }, [workoutFrequency]);

  const storeDispatch = useDispatch<AppDispatch>();

  const { pickerRef } = usePicker<number>();

  const pickerValues = {
    "Once a week": 1,
    "2 times a week": 2,
    "3 times a week": 3,
    "4 times a week": 4,
    "5 times a week": 5,
    "6 times a week": 6,
    "7 times a week": 7,
  };

  const onContinuePress = useCallback(() => {
    navigation.dispatch(successScreenPushAction());
  }, [navigation]);

  return (
    <View testID={testIDs.workout.id} style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="rgba(0, 0, 0, 0)" />
      <Header containerStyle={styles.header} />
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <Image source={require("@assets/images/workout-goal-background-image.jpg")} style={styles.image} />
        <CustomText text={t("workout.title")} variant="titleTopNav" style={styles.title} />
        <CustomPicker<number>
          pickerRef={pickerRef}
          values={pickerValues}
          selectedValue={selectedWorkoutFrequency}
          setSelectedValue={(newFrequency) => storeDispatch(setWorkoutFrequency(newFrequency))}
        />
      </ScrollView>
      <CustomButton
        testID={testIDs.workout.ctaButton.id}
        onPress={onContinuePress}
        text={t("ctaContinue")}
        containerStyle={styles.ctaButton}
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
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
  },
  ctaButton: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignSelf: "center",
  },
});

export default WorkoutScreen;
