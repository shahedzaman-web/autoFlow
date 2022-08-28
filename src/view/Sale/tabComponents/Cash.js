import { useNavigation } from "@react-navigation/native";
import { Box, Button, HStack, Input, Spinner, Text } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { responsive } from "../../../constant/responsive";
import { usePostSaleMutation } from "../../../store/services/appApi";
import colors from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
export default function Cash() {
  const saleData = useSelector((state) => state.sale.data);
  const navigation = useNavigation();

  const [discount, setDiscount] = React.useState("");
  const [postSale, { isLoading }] = usePostSaleMutation();
  const handleSaveCash = async () => {
    try {
      const payload = {
        id: saleData?.id,
        type: "Cash",
        amount: saleData?.price,
        discount: discount,
      };
    
      const { data, error } = await postSale(payload);
      if (data.message === "Sale added successfully.") {
        alert(data.message);
        setDiscount("");
        navigation.navigate("Scan");
      } else {
        alert(error.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Box flex="1" p={spacing[2]}>
      <HStack justifyContent={"space-between"}>
        <Text bold fontSize="lg">
          Amount
        </Text>
        <Text fontSize="lg">kshs. {saleData?.price}</Text>
      </HStack>
      <HStack
        my={spacing[2]}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Text bold fontSize="lg">
          Discount
        </Text>
        <Input
          value={discount}
          keyboardType="numeric"
          onChangeText={(text) => setDiscount(text)}
          width={responsive.wp("40%")}
          placeholder="Discount"
        />
      </HStack>
      <Button onPress={handleSaveCash} varient="unstyled" bg={colors.primary}>
        {isLoading ? (
          <Spinner color={colors.white} />
        ) : (
          <Text color={colors.white}>Accept</Text>
        )}
      </Button>
    </Box>
  );
}