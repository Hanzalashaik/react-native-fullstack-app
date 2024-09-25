import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { PostContext } from "../context/postContext";

const EditModel = ({ modalVisible, setModalVisible, post }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { state } = useContext(AuthContext);
  const { setRefreshing } = useContext(PostContext);

  // Initialize post when it changes
  useEffect(() => {
    if (post) {
      setTitle(post.title || ""); // Set to empty string if title is null
      setDescription(post.description || ""); // Set to empty string if description is null
    }
  }, [post]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `/post/update-post/${post._id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      setRefreshing(true);
      console.log(response.data);
      Alert.alert("Success", response.data.message);
      setModalVisible(false);
      setRefreshing(false);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center">
          {/* Set width of modal here */}
          <View className="w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-2xl shadow-lg shadow-black">
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <Text className="mb-4 text-center text-lg font-semibold">
                Edit Post
              </Text>

              <View className="w-full mb-4">
                <Text className="mb-1 text-gray-700">Title</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter title"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
              <View className="w-full mb-4">
                <Text className="mb-1 text-gray-700">Description</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Enter description"
                  value={description}
                  onChangeText={setDescription}
                  textAlignVertical="top"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <Pressable
                className="rounded-2xl p-3 bg-black mb-2 w-full"
                onPress={handleSave}
              >
                <Text className="text-white font-bold text-center">Update</Text>
              </Pressable>

              <Pressable
                className="rounded-2xl p-3 bg-red-500 w-full"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white font-bold text-center">Cancel</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditModel;
