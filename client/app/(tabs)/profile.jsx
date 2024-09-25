import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import LogoutButton from "../../components/LogoutButton";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [role, setRole] = useState(""); // State for role

  const { state, setState } = useContext(AuthContext);

  const handleEdit = async () => {
    try {
      console.log(name, email, password);

      const response = await axios.put(
        "http://192.168.0.100:5000/api/v1/auth/update-user",
        {
          username: name,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      console.log(response.data);

      // // Clear state and AsyncStorage after profile update
      setState({
        user: null,
        token: "",
      });
      await AsyncStorage.removeItem("@auth");

      Alert.alert("Success", response.data.message);
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to update profile. Please try again later.");
    }
  };

  // Load user data from AsyncStorage on component mount (runs only once)
  useEffect(() => {
    const getUserData = async () => {
      const response = await AsyncStorage.getItem("@auth");
      if (response) {
        try {
          const parsedData = JSON.parse(response);
          setName(parsedData.user?.username);
          setEmail(parsedData.user?.email);
          setRole(parsedData.user?.role);
        } catch (e) {
          console.error("Failed to parse user data:", e);
        }
      }
    };
    getUserData();
  }, []);

  return (
    <SafeAreaView className="relative mt-10 h-full w-full justify-center items-center">
      {/* Logout Button */}
      <View className="absolute top-0 right-0">
        <LogoutButton />
      </View>

      {/* ScrollView for scrolling content */}
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Icon */}
        <View className="mb-4">
          <Ionicons name="person-circle-outline" size={100} color="gray" />
        </View>

        {/* Username */}
        <View className="w-64 flex mb-2">
          <Text className="text-lg mb-2">Username</Text>
          <TextInput
            value={name} // Controlled input tied to name state
            onChangeText={(text) => setName(text)} // Update name state on input change
            className="border p-2 w-full rounded-lg font-bold text-stone-700 mb-1"
          />
        </View>

        {/* Email (non-editable) */}
        <View className="w-64 mb-2">
          <Text className="text-lg mb-2">Email</Text>
          <TextInput
            value={email} // Controlled input tied to email state
            editable={false} // Non-editable email field
            className="border p-2 w-full rounded-lg font-bold text-stone-700 mb-1"
          />
        </View>

        {/* Password (optional edit) */}
        <View className="w-64 mb-2">
          <Text className="text-lg mb-2">Password (optional)</Text>
          <TextInput
            value={password} // Controlled input tied to password state
            onChangeText={(text) => setPassword(text)} // Update password state on input change
            className="border p-2 w-full rounded-lg font-bold text-stone-700 mb-1"
            placeholder="Enter new password"
            secureTextEntry={true} // Mask the password input
          />
        </View>

        {/* Role (non-editable) */}
        <View className="w-64 mb-2">
          <Text className="text-lg mb-2">Role</Text>
          <TextInput
            value={role} // Controlled input tied to role state
            editable={false} // Non-editable role field
            className="border p-2 w-full rounded-lg font-bold text-stone-700 mb-1"
          />
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity
          onPress={handleEdit}
          className="mt-4 bg-transparent border border-black px-6 py-3 rounded-full shadow-lg"
        >
          <Text className="text-lg font-semibold text-gray-800">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
