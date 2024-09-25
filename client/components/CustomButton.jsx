import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({
  title,
  onPress,
  otherSytles,
  loading,
  loadingText,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-blue-300 py-3 px-7 rounded-full ${otherSytles}`}
    >
      <Text className="text-gray-900 text-lg font-semibold">
        {loading ? loadingText : title}
      </Text>
    </TouchableOpacity>
  );
}
