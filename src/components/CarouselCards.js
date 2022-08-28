import { Box, Center, HStack, Text } from "native-base";
import React from "react";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { responsive } from "../constant/responsive";
import colors from "../theme/colors";
import { spacing } from "../theme/spacing";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";

const CarouselCards = ({ details }) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <Box p={spacing[1]}>
      <Text bold fontSize="lg">
        {details?.name}
      </Text>
      <Center my={spacing[2]}>
        <Carousel
          layout="stack"
          layoutCardOffset={9}
          ref={isCarousel}
          data={details?.images}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
        />
        <Pagination
          dotsLength={details?.images?.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: "rgba(6,17,253,0.94)",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </Center>

      <Box 
      my={spacing[3]}
      shadow="3" bg={colors.gray} py={spacing[2]} 
      borderRadius="sm"
      >
        <HStack
          justifyContent={"space-between"}
          borderBottomWidth="0.8"
          borderBottomColor={colors.primary}
          p="0.2"
          px={spacing[3]}
        >
          <Box w={responsive.wp("35%")}>
            <Text bold fontSize="md">
              LOCATION :
            </Text>
          </Box>
          <Box w={responsive.wp("60%")}>
            <Text fontSize="md">{details?.location?.name}</Text>
          </Box>
        </HStack>
        <HStack
          justifyContent={"space-between"}
          borderBottomWidth="0.8"
          borderBottomColor={colors.primary}
          p="0.2"
          px={spacing[3]}
        >
          <Box w={responsive.wp("35%")}>
            <Text bold fontSize="md">
            AREA :
            </Text>
          </Box>
          <Box w={responsive.wp("60%")}>
            <Text fontSize="md">{details?.area?.name}</Text>
          </Box>
        </HStack>
        <HStack
          justifyContent={"space-between"}
          borderBottomWidth="0.8"
          borderBottomColor={colors.primary}
          p="0.2"
          px={spacing[3]}
        >
          <Box w={responsive.wp("35%")}>
            <Text bold fontSize="md">
            PRICE :
            </Text>
          </Box>
          <Box w={responsive.wp("60%")}>
            <Text fontSize="md">{details?.price}</Text>
          </Box>
        </HStack>
        <HStack
          justifyContent={"space-between"}
          borderBottomWidth="0.8"
          borderBottomColor={colors.primary}
          p="0.2"
          px={spacing[3]}
        >
          <Box w={responsive.wp("35%")}>
            <Text bold fontSize="md">
            PART NUMBER :
            </Text>
          </Box>
          <Box w={responsive.wp("60%")}>
            <Text fontSize="md">{details?.no}</Text>
          </Box>
        </HStack>
        <HStack
          justifyContent={"space-between"}
          borderBottomWidth="0.8"
          borderBottomColor={colors.primary}
          p="0.2"
          px={spacing[3]}
        >
          <Box w={responsive.wp("35%")}>
            <Text bold fontSize="md">
            STOCK :
            </Text>
          </Box>
          <Box w={responsive.wp("60%")}>
            <Text fontSize="md">{details?.quantity}</Text>
          </Box>
        </HStack>
        <HStack
          justifyContent={"space-between"}
          borderBottomWidth="0.8"
          borderBottomColor={colors.primary}
          p="0.2"
          px={spacing[3]}
        >
          <Box w={responsive.wp("35%")}>
            <Text bold fontSize="md">
            DEFECT :
            </Text>
          </Box>
          <Box w={responsive.wp("60%")}>
            <Text fontSize="md">{details?.defect !== undefined ? details?.defect : "NO"}</Text>
          </Box>
        </HStack>
        <HStack
          justifyContent={"space-between"}
      
          p="0.2"
          px={spacing[3]}
        >
          
            <Text bold fontSize="md">
            For : {details?.name}
            </Text>
          
        </HStack>
       
      </Box>
    </Box>
  );
};

export default CarouselCards;
