import { Flex, Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";

const Message = ({ status, description }) => {
    return (
        <Flex my={2}>
            <Alert status={`${status}`}>
                <AlertIcon />
                <AlertDescription>{description}</AlertDescription>
            </Alert>
        </Flex>
    )
}

export default Message;