import { HStack, ListItem, UnorderedList, Box } from "@chakra-ui/react";

function Pagination(props) {
  const { numPerPage, totalNum, setCurrentPage, currentPage } = props;
  const pageNums = [];

  for (let i = 1; i <= Math.ceil(totalNum / numPerPage); i++) {
    pageNums.push(i);
  }

  return (
    <nav>
      <HStack spacing={0}>
        {pageNums.map((num) => (
          <Box
            paddingLeft={3}
            paddingRight={3}
            bg={currentPage == num ? "white" : "#051e3e"}
            color={currentPage == num ? "#051e3e" : "white"}
            borderColor={currentPage == num ? "#051e3e" : "white"}
            borderWidth={1}
            onClick={() => {
              setCurrentPage(num);
            }}
            cursor="pointer"
          >
            <a href="#!">{num}</a>
          </Box>
        ))}
      </HStack>
    </nav>
  );
}

export default Pagination;
