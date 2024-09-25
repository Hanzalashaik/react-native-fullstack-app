import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // For icons (password toggle)

export default function Formfield({
  title,
  value,
  setValue,
  placeholder,
  keyboardType,
  autocomplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="space-y-2">
      <Text className="text-base text-slate-300 font-semibold">{title}</Text>
      <View
        className={`relative border-2 border-slate-500 rounded-2xl h-16 w-full bg-slate-700 px-4 flex-row items-center`}
        style={{ shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 10 }}
      >
        <TextInput
          placeholderTextColor="#9ca3af"
          value={value}
          placeholder={placeholder}
          onChangeText={setValue}
          className="flex-1 text-base text-white font-semibold"
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
          autoComplete={autocomplete}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#9ca3af"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
