import { Box, VStack, HStack, Tooltip, Divider } from "@chakra-ui/react";
import { useState, useLayoutEffect, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

function OverflowableContent(props) {
  const { heightBeforeOverflow, showDivider } = props;
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showingMore, setShowingMore] = useState(false);

  const contentRef = useRef();

  useLayoutEffect(() => {
    if (contentRef.current.clientHeight < contentRef.current.scrollHeight) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [contentRef.current]);

  return (
    <VStack
      align="stretch"
      bgGradient={
        isOverflowing && !showingMore
          ? "linear(to-b, #FFFFFF, 80%, #E2E2E2)"
          : "none"
      }
      spacing={0}
    >
      <Box
        paddingLeft="4"
        paddingRight="4"
        paddingBottom="2"
        maxH={showingMore ? "none" : heightBeforeOverflow}
        overflow="hidden"
        ref={contentRef}
      >
        {props.children}
      </Box>
      {isOverflowing ? (
        <HStack
          w="100%"
          bottom="0%"
          justifyContent="space-between"
          position="relative"
        >
          {showDivider && <Divider orientation="horizontal" w="45%" />}
          <Tooltip label={showingMore ? "Show less" : "Show more"}>
            <Box
              onClick={() => setShowingMore(!showingMore)}
              cursor="pointer"
              position="absolute"
              left="50%"
              transform="translateX(-100%)"
            >
              {showingMore ? (
                <ChevronUpIcon w={6} h={6} />
              ) : (
                <ChevronDownIcon w={6} h={6} />
              )}
            </Box>
          </Tooltip>
          {showDivider && <Divider orientation="horizontal" w="45%" />}
        </HStack>
      ) : (
        showDivider && <Divider orientation="horizontal" />
      )}
    </VStack>
  );
}

export default OverflowableContent;
