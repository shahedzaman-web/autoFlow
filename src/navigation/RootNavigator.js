import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import Home from "../view/Home/Home";
import { useSelector,useDispatch } from "react-redux";
import Login from "../view/Login/Login";
import ProductDetails from "../view/ProductDetails/ProductDetails";
import Sale from "../view/Sale/Sale";
import Scan from "../view/Scan/Scan";

import { SimpleLineIcons } from "@expo/vector-icons";
import { logout } from "../store/slices/authSlice";
const Stack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const RootNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log({ userInfo });
  const AppNavigator = () => {
    const navigation = useNavigation();
    const handleSignOut = () => {
      dispatch(logout());

      navigation.replace("Login");
    };
    return (
      <AppStack.Navigator
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity onPress={handleSignOut}>
              <SimpleLineIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      >
        <AppStack.Screen
          options={{ title: "AutoFlow" }}
          name="Home"
          component={Home}
        />
        <AppStack.Screen
      
          name="Sale"
          component={Sale}
        />
        <AppStack.Screen
          options={{ title: "Scan QR Code" }}
          name="Scan"
          component={Scan}
        />
        <AppStack.Screen
          options={{ title: "Part Information" }}
          name="Product"
          component={ProductDetails}
        />
      </AppStack.Navigator>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "App" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
