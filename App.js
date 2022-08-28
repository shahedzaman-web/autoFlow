import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import RootNavigator from "./src/navigation/RootNavigator";
import store, { persistor } from "./src/store";
import { StatusBar } from "expo-status-bar";

import { NativeBaseProvider } from "native-base";
import LoadingScreen from "./src/view/LoadingScreen.js/LoadingScreen";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <StatusBar style="light" />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  );
};
export default App;
