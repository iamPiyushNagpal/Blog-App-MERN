import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="main">

        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
