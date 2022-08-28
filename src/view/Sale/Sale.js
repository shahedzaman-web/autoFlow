import { Box, useColorModeValue } from "native-base";
import { Dimensions, Animated, Pressable } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import React from "react";
import colors from "../../theme/colors";
import Mpesa from "./tabComponents/Mpesa";
import Cash from "./tabComponents/Cash";

const initialLayout = {
  width: Dimensions.get("window").width,
};
const renderScene = SceneMap({
  first: Cash,
  second: Mpesa,
});

const TabComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Cash",
    },
    {
      key: "second",
      title: "MPESA",
    },
  ]);

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? colors.primary : colors.black;
          const fontWeight = index === i ? "bold" : "normal";
          const borderColor =
            index === i
              ? colors.primary
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
            >
              <Pressable
                alignItems="center"
                width={"100%"}
                onPress={() => {
                
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                    fontSize: 16,
                    fontWeight,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const Sale = () => {

  return (
    <Box flex={1} >
      <TabComponent  />
    </Box>
  );
};

export default Sale;
