import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { authStackPushAction } from "../../navigationActionCreators";
import { RootStackNavigation } from "../index";

function SplashScreen() {
  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {
    navigation.dispatch(authStackPushAction());
  }, [navigation]);

  return <SafeAreaView style={styles.container} />;
}

interface Styles {
  container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
});

export default SplashScreen;
