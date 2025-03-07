import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Category from './pages/Category';
import Recipie from './pages/Recipie';
import Favorites from './pages/Favorites';  // Import Favorites Page

function App() {
  return (
    <div className="App">
     <Navbar />
     
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/recipie/:id" element={<Recipie />} />
      <Route path="/favorites" element={<Favorites />} />  {/* Favorites Page Route */}
     </Routes>

     <Footer />
    </div>
  );
}

export default App;
