import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Box, Button, Center, Pressable, Text } from "native-base";
import { spacing } from "../../theme/spacing";
import LoadingScreen from "../LoadingScreen.js/LoadingScreen";
import { responsive } from "../../constant/responsive";
import { useGetProductDetailsQuery } from "../../store/services/appApi";
import colors from "../../theme/colors";

export default function Scan({ navigation }) {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [text, setText] = React.useState("Not yet scanned");
    
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      if (status === "granted") {
        setHasPermission(status === "granted");
      }
    })();
  };

  // Request Camera Permission
  React.useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = async ({data}) => {
    try{

    setScanned(true);
    // const data = { _id: "629fa730af05516e4bfd3316" };
    const scanData = JSON.parse(data);

     navigation.navigate("Product", { details: scanData?._id });
    setText("Press to Scan Again");
    }
    catch(e){
        alert(e.message)
    }
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <Box safeArea flex={"1"}>
        <Text>Requesting for camera permission</Text>
      </Box>
    );
  }
  if (hasPermission === false) {
    return (
      <Box safeArea flex={"1"}>
        <Text m={spacing[2]}>No access to camera</Text>
        <Button
          varient="unstyled"
          bg={colors.primary}
          onPress={() => askForCameraPermission()}
        >
          <Text>Allow Camera</Text>
        </Button>
      </Box>
    );
  }


  const handleScan = async () => {
    setScanned(false);
    setText("")
  };

  return (
    <Box safeArea flex={"1"}>
      {scanned ? (
        <Text bold>{text}</Text>
      ) : (
        <Center>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{
              height: responsive.hp("80%"),
              width: responsive.wp("80%"),
            }}
          />
        </Center>
      )}

{text !== "" && <Box mx={spacing[2]}>
<Pressable 
        p={spacing[2]}
        borderRadius="lg"
        alignItems={"center"}
      mt={spacing[3]}
      bg={colors.primary}
      onPress={handleScan}>
        <Text color={colors.white}>Scan</Text>
      </Pressable>
</Box>}
    </Box>
  );
}
