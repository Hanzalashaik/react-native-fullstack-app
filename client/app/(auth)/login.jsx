import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setState } = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        Alert.alert("Please fill all the fields");
        setLoading(false);
        return;
      }

      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      console.log(response.data);
      setState(response.data);
      await AsyncStorage.setItem("@auth", JSON.stringify(response.data));
      Alert.alert(response.data.message);
      setLoading(false);
      router.push("/home");
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  const getLocalStorage = async () => {
    const data = await AsyncStorage.getItem("@auth");
    console.log("local storag==> ", data);
  };
  // getLocalStorage();

  return (
    <SafeAreaView className="h-full w-full flex justify-center items-center bg-indigo-700">
      <Text className="text-2xl mb-6 text-white font-bold tracking-wider">
        Login
      </Text>
      <View className="w-4/5 space-y-6">
        <Formfield
          title="Email"
          value={email}
          setValue={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autocomplete="email"
        />

        <Formfield
          title="Password"
          value={password}
          setValue={setPassword}
          placeholder="Create a password"
          keyboardType="default"
          autocomplete="password"
        />
      </View>

      <CustomButton
        loading={loading}
        title={"Login"}
        otherSytles="mt-6 px-10"
        onPress={handleSubmit}
        loadingText={"Please Wait..."}
      />

      <TouchableOpacity className="flex-row items-center justify-center mt-6">
        <Text className="text-white text-sm font-semibold">
          Dont have an account?{" "}
          <Text
            onPress={() => router.push("/register")}
            className="text-black underline"
          >
            Register
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
