import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  //base url
  axios.defaults.baseURL = "http://192.168.0.100:5000/api/v1";
  // axios.defaults.baseURL = "http://192.168.49.1:5000/api/v1";
  useEffect(() => {
    const localStorageData = async () => {
      try {
        let data = await AsyncStorage.getItem("@auth");
        let loginData = data ? JSON.parse(data) : null;
        if (loginData) {
          setState({ ...state, user: loginData.user, token: loginData.token });
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      }
    };

    localStorageData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
