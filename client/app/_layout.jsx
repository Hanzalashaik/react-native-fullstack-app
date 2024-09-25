import { useContext, useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { AuthProvider } from "../context/authContext"; // Ensure named import if exported correctly
import { PostProvider } from "../context/postContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error); // Log the error
      return; // Early return on error
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide splash screen when fonts are loaded
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null; // Show nothing while fonts are loading
  }

  return (
    <AuthProvider>
      <PostProvider>
        <Stack>
          {/* Authentication flow screen */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

          {/* Main app flow screen */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PostProvider>
    </AuthProvider>
  );
};

export default RootLayout;
