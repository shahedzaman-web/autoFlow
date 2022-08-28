import { Box, Button, Center, HStack, Icon, Text, VStack } from "native-base";
import React from "react";
import { responsive } from "../../constant/responsive";
import colors from "../../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { spacing } from "../../theme/spacing";
export default function Home({ navigation }) {
  return (
    <Box flex={"1"} safeArea>
      <Box m={spacing[2]}>
        <Button
          onPress={() => navigation.navigate("Scan")}
          px={spacing[4]}
          w={responsive.wp("90%")}
          h={responsive.hp("8%")}
          varient="unstyled"
          bg={colors.primary}
          leftIcon={<Icon as={AntDesign} name="scan1" size="sm" />}
        >
          <Text bold color={colors.white} fontSize="lg">
            Scan
          </Text>
        </Button>
      </Box>
    </Box>
  );
}
