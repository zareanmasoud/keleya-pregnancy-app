import { useRef } from "react";
import { Picker } from "@react-native-picker/picker";

function usePicker<T>() {
  const pickerRef = useRef<Picker<T> | null>(null);

  function open() {
    pickerRef.current?.focus();
  }

  function close() {
    pickerRef.current?.blur();
  }

  return {
    pickerRef,
    open,
    close,
  };
}

export { usePicker };
