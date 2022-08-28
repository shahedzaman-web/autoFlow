import { Box, Button, HStack, ScrollView, Text } from "native-base";
import React from "react";
import CarouselCards from "../../components/CarouselCards";
import { responsive } from "../../constant/responsive";
import { useGetProductDetailsQuery } from "../../store/services/appApi";
import colors from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import LoadingScreen from "../LoadingScreen.js/LoadingScreen";
import { useDispatch } from "react-redux";
import { storeData } from "../../store/slices/saleSlice";
export default function ProductDetails({ route, navigation }) {
  const { details } = route.params;
  const { data, isLoading } = useGetProductDetailsQuery(details);
  const dispatch = useDispatch();
  const handleReScan = async () => {
    navigation.navigate("Scan");
   
  };

  const handleAccept = async () => {
    navigation.navigate("Sale");
    dispatch(storeData({
        price:data?.price,
       id: data?._id
   }))
  };
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <ScrollView flex={"1"}>
      <Box p={spacing[2]}>
        <CarouselCards details={data} />
      </Box>
      <Box>
        <HStack justifyContent={"space-between"} mx={spacing[2]}  mb={spacing[2]} >
          <Button
            w={responsive.wp("40%")}
            onPress={handleReScan}
            varient="unstyled"
            bg={colors.primary}
          >
            <Text color={colors.white}>Rescan</Text>
          </Button>
          <Button
            w={responsive.wp("40%")}
            onPress={handleAccept}
            varient="unstyled"
            bg={colors.primary}
          >
            <Text color={colors.white}>Accept</Text>
          </Button>
        </HStack>
      </Box>
    </ScrollView>
  );
}
