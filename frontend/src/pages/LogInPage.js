import {
    Box, Container, Input, Button, Heading, Text, Link, VStack, InputGroup,
    InputRightElement, IconButton, FormControl, FormLabel
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from 'react-router-dom';
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

const LogInPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo])

    const setShowHandler = () => {
        setShow(!show);
    }

    const logInHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <Container maxW={'container.sm'}>
            <Box maxW={'450px'} mx='auto'>
                <Heading py={5}>LOG IN</Heading>
                {error && <Message status="error" description={error} />}
                <form onSubmit={logInHandler}>
                    <VStack spacing={'2'}>
                        <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input id='email' type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input id='password'
                                    type={show ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement>
                                    <IconButton
                                        onClick={setShowHandler}
                                        icon={show ? <i className="fa-solid fa-eye-slash"></i> :
                                            <i className="fa-solid fa-eye"></i>} />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </VStack>
                    <Button
                        type='submit' my={4} width={'100%'}
                        isLoading={loading}
                        loadingText="Logging In"
                    >LOG IN</Button>
                </form>
                <Text>New Member? <Link as={ReactRouterLink} to="/signup">
                    Click here to Sign Up</Link>
                </Text>
            </Box>
        </Container>
    )
}

export default LogInPage
