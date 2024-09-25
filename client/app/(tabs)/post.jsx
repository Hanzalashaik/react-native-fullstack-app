import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import postImg from "../../assets/icons/plus.png";
import { PostContext } from "../../context/postContext"; // Ensure it's the correct import

const Post = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { setRefreshing } = useContext(PostContext);
  const { state } = useContext(AuthContext);

  const handleCreatePost = async () => {
    if (!title || !desc) {
      Alert.alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        "/post/create-post",
        { title, description: desc },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      setRefreshing(true);
      // console.log(response.data);
      Alert.alert("Success", response.data.message, [
        {
          text: "OK",
          onPress: () => {
            setTitle("");
            setDesc("");
          },
        },
      ]);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred";
      Alert.alert(errorMessage);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white py-6 px-4">
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-4xl font-bold my-8 text-gray-800">
          Create Post
        </Text>

        <View className="w-full max-w-md mb-4">
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Add post title"
            placeholderTextColor={"#9ca3af"}
            className="border border-gray-300 text-base p-4 rounded-lg shadow-md font-bold text-gray-700 mb-2"
          />
        </View>

        <View className="w-full max-w-md mb-4">
          <TextInput
            value={desc}
            onChangeText={setDesc}
            placeholder="Add post description"
            placeholderTextColor={"#9ca3af"}
            className="border border-gray-300 p-4 w-full rounded-lg shadow-md font-bold text-gray-700 mb-2 text-base"
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          onPress={handleCreatePost}
          className="flex flex-row items-center justify-center mt-4 bg-blue-600 px-6 py-3 rounded-full shadow-lg hover:bg-blue-500"
        >
          <Image
            source={postImg}
            resizeMode="contain"
            className="w-6 h-6 mr-2"
          />
          <Text className="text-lg font-semibold text-white">Create Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
