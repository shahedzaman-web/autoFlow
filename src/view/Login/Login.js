import {
  Box,
  Button,
  Center,
  Icon,
  Image,
  Input,
  ScrollView,
  Spinner,
  Stack,
  Text,
} from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { useSigninUserMutation } from "../../store/services/authApi";
export default function Login({ navigation }) {
  const [show, setShow] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [signinUser, { isLoading }] = useSigninUserMutation();
  const handleSignIn = async () => {
    if (email === "" || password === "") {
      alert("Please enter all field.");
    } else {
      try {
        const payload = {
          email,
          password,
        };

        const { error, data } = await signinUser(payload);

        if (data?.payload) {
          navigation.replace("App");
        } else {
          alert(error?.data.message);
        }
      } catch (e) {
        alert(e.message);
      }
    }
  };
  return (
    <Box safeArea flex={"1"}>
      <ScrollView>
        <Center mt={spacing[6]}>
          <Image
            alt="logo"
            source={require("./../../../assets/logo.png")}
            size="2xl"
          />
        </Center>

        <Stack space={4} w="100%" alignItems="center">
          <Input
            w={{
              base: "85%",
              md: "25%",
            }}
            onChangeText={(e) => setEmail(e)}
            value={email}
            fontSize="md"
            keyboardType="email-address"
            autoCapitalize="none"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="email" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Enter Email"
          />
          <Input
            w={{
              base: "85%",
              md: "25%",
            }}
            fontSize="md"
            value={password}
            onChangeText={(e) => setPassword(e)}
            type={show ? "text" : "password"}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
                onPress={() => setShow(!show)}
              />
            }
            autoCapitalize="none"
            placeholder="Password"
          />
        </Stack>
        <Button
        alignSelf={"center"}
          onPress={handleSignIn}
          my={spacing[4]}
          variant="unstyled"
          bg={colors.primary}
          w={{
              base: "85%",
              md: "25%",
            }}
        >
          {isLoading ? (
            <Spinner color={colors.white} />
          ) : (
            <Text  fontSize="md" color={colors.white}>Sign In</Text>
          )}
        </Button>
      </ScrollView>
    </Box>
  );
}
