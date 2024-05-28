
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "../src/pages/home.js";
import Auth from "../src/pages/auth.js";
import CreateRecipe from "./pages/create-recipe.js";
import SavedRecipe from "./pages/saved-recipe.js";
import Navbar from './components/navbar.js';
import Register from './components/register.js';
import Login from './components/login.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/create-recipe' element={<CreateRecipe />} />
          <Route path='/saved-recipe' element={<SavedRecipe />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/auth' element={<Auth />} /> */}


        </Routes>
      </Router>
    </div>
  );
}

export default App;