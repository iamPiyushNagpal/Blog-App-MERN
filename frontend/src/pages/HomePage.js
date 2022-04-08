import { Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BlogList from '../components/BlogList';
import {
    BLOGPOST_COMMENTS_RESET
} from '../constants/blogPostConstants';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: BLOGPOST_COMMENTS_RESET });
    }, [])
    
    return (
        <Container maxW={'container.xl'}>
            <BlogList />
        </Container>
    )
}

export default HomePage
