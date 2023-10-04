import React, { Dispatch, SetStateAction, useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import DatePicker from "react-native-date-picker";
import { GlobalError } from "react-hook-form";
import DateButton from "./DateButton";
import HintText from "../HintText";

interface Props {
  testID?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  date: Date;
  setDate: Dispatch<Date>;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  error?: GlobalError | undefined;
}

function CustomDatePicker({
  testID = undefined,
  isOpen,
  setIsOpen,
  date,
  setDate,
  containerStyle = {},
  error = undefined,
}: Props) {
  const maximumDueDate = useMemo<Date>(() => {
    const newDate = new Date();
    const maximumTimestamp = newDate.setMonth(newDate.getMonth() + 9);
    return new Date(maximumTimestamp);
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <DateButton date={date} onPress={() => setIsOpen(true)} containerStyle={styles.dateButton} />
      <DatePicker
        modal
        testID={testID}
        mode="date"
        minimumDate={new Date()}
        maximumDate={maximumDueDate}
        open={isOpen}
        date={date}
        onConfirm={(newDate) => {
          setIsOpen(false);
          setDate(newDate);
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
      />
      {error?.type && <HintText message={error.message || ""} containerStyle={styles.error} />}
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  dateButton: ViewStyle;
  error: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {},
  dateButton: {
    alignSelf: "center",
  },
  error: {
    alignSelf: "center",
    textAlign: "center",
  },
});
export default CustomDatePicker;
