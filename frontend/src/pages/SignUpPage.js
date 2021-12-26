import {
    Box, Container, Input, Button, Heading, Text, Link, VStack, InputGroup,
    InputRightElement, IconButton, FormControl, FormLabel
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from 'react-router-dom';
import { signup } from "../actions/userActions";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

const SignUpPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userSignup = useSelector(state => state.userSignup)
    const { loading, error, userInfo } = userSignup;

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo])

    const setShowHandler = () => {
        setShow(!show);
    }

    const signUpHandler = (e) => {
        e.preventDefault();
        dispatch(signup(name, email, password));
    }

    return (
        <Container maxW={'container.sm'}>
            <Box maxW={'450px'} mx='auto'>
                {error && <Message status="error" description={error} />}
                <Heading py={5}>SIGN UP</Heading>
                <form onSubmit={signUpHandler}>
                    <VStack spacing={'2'}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input id='name' type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
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
                    <Button type='submit' my={4} width={'100%'}
                        isLoading={loading}
                        loadingText="Signing Up"
                    >SIGN UP</Button>
                </form>
                <Text>Old Member? <Link as={ReactRouterLink} to="/login">
                    Click here to Log In</Link>
                </Text>
            </Box>
        </Container>
    )
}

export default SignUpPage
