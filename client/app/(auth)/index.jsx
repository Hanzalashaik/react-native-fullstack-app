import { Link, router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-blue-950 h-full justify-center items-center">
      <Text className="text-3xl mb-10 text-white font-semibold">
        Hello World!!
      </Text>
      <CustomButton
        title={"Register"}
        onPress={() => router.push("/register")}
      />
    </SafeAreaView>
  );
}
