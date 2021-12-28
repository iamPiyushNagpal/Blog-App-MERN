import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import NewBlogPostPage from './pages/NewBlogPostPage';
import BlogPostDetails from './pages/BlogPostDetails';
import MyBlogPostsPage from './pages/MyBlogPostsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="main">
          <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path='/login' element={<LogInPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/create-blog-post' element={<NewBlogPostPage />} />
            <Route path='/blogpost/:id' element={<BlogPostDetails />} />
            <Route path='/blogposts/author/:id' element={<MyBlogPostsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
