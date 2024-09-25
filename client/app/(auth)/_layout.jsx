import { useContext, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../context/authContext.js"; // Import the AuthContext

const AuthLayout = () => {
  const { state } = useContext(AuthContext); // Access authentication state
  const router = useRouter(); // Use router for navigation

  // Check if the user is logged in and navigate to the main app if they are
  useEffect(() => {
    if (state?.user) {
      router.replace("/home"); // Redirect to main app (index page or main flow)
    }
  }, [state?.user]);

  // If the user is logged in, the useEffect will redirect. Otherwise, render login/register.
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
