import { Container } from '@chakra-ui/react';
import BlogList from '../components/BlogList';

const HomePage = () => {
    return (
        <Container maxW={'container.xl'}>
            <BlogList />
        </Container>
    )
}

export default HomePage
