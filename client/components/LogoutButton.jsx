import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useContext } from "react";
import logout from "../assets/icons/logout.png";
import { AuthContext } from "../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styled } from "nativewind";

export default function LogoutButton() {
  const { state, setState } = useContext(AuthContext);
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    Alert.alert("Logout Successfully");
  };

  const StyledTouchableOpacity = styled(TouchableOpacity);

  return (
    <StyledTouchableOpacity
      className="p-3  rounded-lg flex items-center justify-center"
      onPress={handleLogout}
    >
      <Image source={logout} className="w-[30px] h-7" />
    </StyledTouchableOpacity>
  );
}
