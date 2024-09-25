import { View, Text, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import home from "../../assets/icons/home.png";
import plus from "../../assets/icons/plus.png";
import posts from "../../assets/icons/icon.png";
import profile from "../../assets/icons/profile.png";
import LogoutButton from "../../components/LogoutButton";
import { AuthContext } from "../../context/authContext"; // Import AuthContext

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { state } = useContext(AuthContext); // Access authentication state
  const router = useRouter();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!state?.user) {
      router.replace("/login");
    }
  }, [state?.user]);

  // If the user is not logged in, render nothing (redirects to login page)
  if (!state?.user) {
    return null;
  }

  // If the user is logged in, render the tabs
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Full Stack App",
          headerShown: true,
          headerRight: () => <LogoutButton />,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={home} color={color} name="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={plus} color={color} name="Post" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="myposts"
        options={{
          title: "My Posts",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={posts}
              color={color}
              name="My Posts"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
