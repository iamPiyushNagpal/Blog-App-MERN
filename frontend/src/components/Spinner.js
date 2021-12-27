import { Flex, Spinner as Loader } from "@chakra-ui/react";

const Spinner = () => {
    return (
        <Flex h="75vh" alignItems="center" justify="center">
            <Loader
                color='purple.500'
                thickness="5px"
                speed="0.65s"
                size="xl"
            />
        </Flex>
    )
}

export default Spinner;