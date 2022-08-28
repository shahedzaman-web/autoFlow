import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  HStack,
  Input,
  ScrollView,
  Spinner,
  Text,
  TextArea,
} from "native-base";
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
  const [mobileNo, setMobileNo] = React.useState("");
  const [note, setNote] = React.useState("");
  const handleSaveCash = async () => {
    try {
      const payload = {
        id: saleData?.id,
        type: "Cash",
        amount: saleData?.price,
        discount: discount,
        mobileNo: mobileNo,
        note: note,
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <HStack justifyContent={"space-between"}>
          <Text bold fontSize="lg">
            Amount
          </Text>
          <Text fontSize="md">kshs. {saleData?.price}</Text>
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
        <HStack
          my={spacing[2]}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Text bold fontSize="lg">
            Total Payable
          </Text>
          <Box
            width={responsive.wp("40%")}
            borderColor={colors.darkGray}
            borderRadius="sm"
            borderWidth="1"
            p={spacing[1]}
          >
            <Text>{saleData?.price - discount} </Text>
          </Box>
        </HStack>
        <HStack
          my={spacing[2]}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Text bold fontSize="lg">
            Mobile Number
          </Text>
          <Input
            value={mobileNo}
            keyboardType="numeric"
            onChangeText={(text) => setMobileNo(text)}
            width={responsive.wp("40%")}
            placeholder="Mobile Number"
          />
        </HStack>
        <HStack
          my={spacing[2]}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Text bold fontSize="lg">
            Note
          </Text>

          <TextArea
            h={20}
            placeholder="Enter Note Here"
            w="75%"
            maxW="300"
            value={note}
            onChangeText={(text) => setNote(text)}
          />
        </HStack>
        <Button onPress={handleSaveCash} varient="unstyled" bg={colors.primary}>
          {isLoading ? (
            <Spinner color={colors.white} />
          ) : (
            <Text  fontSize="md"  color={colors.white}>Confirm Sell</Text>
          )}
        </Button>
      </ScrollView>
    </Box>
  );
}
