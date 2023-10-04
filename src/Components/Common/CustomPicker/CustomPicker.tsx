import { Picker } from "@react-native-picker/picker";
import { Dispatch, LegacyRef } from "react";

interface Props<T> {
  pickerRef: LegacyRef<Picker<T>> | undefined;
  selectedValue?: T;
  setSelectedValue: Dispatch<T>;
  values: Record<string, T>;
}
function CustomPicker<T>({ pickerRef, selectedValue = 0 as T, setSelectedValue, values }: Props<T>) {
  return (
    <Picker<T> ref={pickerRef} selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
      {Object.entries(values).map(([key, value]) => {
        return <Picker.Item key={key} label={key} value={value} />;
      })}
    </Picker>
  );
}

export default CustomPicker;
