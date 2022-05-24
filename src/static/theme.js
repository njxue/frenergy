import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    components: {
        Table: {
            baseStyle: {
                variant: "striped",
                colorScheme: "gray"
            }
        }
    }
});


export default theme;