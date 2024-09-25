import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import deleteImg from "../../assets/icons/delete.png";
import editImg from "../../assets/icons/edit.png";
import EditModel from "../../components/EditModel";
import { PostContext } from "../../context/postContext";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const { setRefreshing } = useContext(PostContext);
  const [refresh, setRefresh] = useState(false);

  const getUserPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/post/get-user-posts", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      setPosts(response.data.posts);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Error fetching posts"
      );
    } finally {
      setLoading(false);
    }
  };
  const onRefresh = async () => {
    setRefresh(true);
    await getUserPosts(); // Call the function to fetch new posts
    setRefresh(false); // Reset refreshing state
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/post/delete-post/${postId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      setLoading(true);
      setPosts(posts.filter((post) => post._id !== postId));
      Alert.alert("Success", "Post deleted successfully");
      setRefreshing(false);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Error deleting post"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (postId) => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setRefreshing(true), deletePost(postId);
        },
        style: "destructive",
      },
    ]);
  };

  useEffect(() => {
    getUserPosts();
  }, [modalVisible]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gradient-to-b from-blue-100 to-white">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-lg text-blue-500 mt-4">
          Loading your posts...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-100 to-white py-6 px-4">
      <Text className="text-2xl font-bold text-center mb-6">My Posts</Text>
      <EditModel
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        post={editPost}
      />
      <Text className="text-xl font-bold text-left text-green-600 ml-4 mb-6">
        Total Posts: {posts.length}
      </Text>
      <ScrollView
        className="space-y-4"
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {posts.length === 0 ? (
          <Text className="text-center text-lg text-gray-500">
            No posts found.
          </Text>
        ) : (
          posts.map((post) => (
            <View
              key={post._id}
              className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </Text>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={() => {
                      setEditPost(post);
                      setModalVisible(true); // Ensure separate lines
                    }}
                  >
                    <Image
                      source={editImg}
                      className="w-6 h-6"
                      style={{ tintColor: "#0096FF" }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(post._id)}>
                    <Image
                      source={deleteImg}
                      className="w-6 h-6"
                      style={{ tintColor: "#FF0000" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-gray-600 mb-4">{post.description}</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-gray-500">
                  {moment(post.createdAt).format("DD MMM YYYY")}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
