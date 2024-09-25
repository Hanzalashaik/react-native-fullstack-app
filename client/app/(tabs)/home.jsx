import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostContext } from "../../context/postContext";
import moment from "moment";
import profile from "../../assets/icons/profile.png";

const Home = () => {
  const { posts } = useContext(PostContext);

  return (
    <SafeAreaView className="h-full w-full bg-gradient-to-b from-blue-200 to-white">
      <Text className="text-xl text-green-600 font-bold text-center ">
        Total Posts: {posts.length}
      </Text>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          alignItems: "center",
        }}
      >
        {posts.map((post, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white rounded-lg border border-yellow-500 shadow-lg p-4 mb-4 w-full max-w-md overflow-hidden"
          >
            {/* Optional Post Image */}
            {post.imageUrl && (
              <Image
                source={{ uri: post.imageUrl }} // Assuming there's an image URL
                className="w-full h-40 rounded-lg mb-2"
                resizeMode="cover"
              />
            )}

            <Text className="text-xl font-bold mb-2">{post?.title}</Text>
            <Text className="text-gray-700 mb-4">{post?.description}</Text>

            <View className="mt-2 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Image
                  source={profile}
                  className="w-4 h-4 mr-2"
                  style={{ tintColor: "#FFBF00" }}
                />
                <Text className="text-gray-500 text-sm">
                  {" "}
                  {`Posted by ${post?.postedBy?.username}`}
                </Text>
              </View>
              <Text className="text-gray-500 text-sm">
                {moment(post?.createdAt).format("DD:MM:YYYY")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
