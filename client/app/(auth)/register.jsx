import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!email || !username || !password) {
        Alert.alert("Please fill all the fields");
        setLoading(false);
        return;
      }
      const response = await axios.post("/auth/register", {
        email,
        username,
        password,
      });
      console.log(response.data);
      Alert.alert(response.data.message);
      setLoading(false);
      router.push("/login");
    } catch (error) {
      Alert.alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="h-full w-full flex justify-center items-center bg-indigo-700">
      <Text className="text-2xl mb-6 text-white font-bold tracking-wider">
        Register
      </Text>
      <View className="w-4/5 space-y-6">
        <Formfield
          title="Username"
          value={username}
          setValue={setUsername}
          keyboardType="default"
          placeholder="Choose a username"
        />
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
        title={"Sign Up"}
        otherSytles="mt-6"
        onPress={handleSubmit}
        loadingText={"Please Wait..."}
      />

      <TouchableOpacity className="flex-row items-center justify-center mt-6">
        <Text className="text-white text-sm font-semibold">
          Already have an account?{" "}
          <Text
            onPress={() => router.push("/login")}
            className="text-black underline"
          >
            Login
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
