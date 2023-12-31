import "./App.css"
import Login from "./components/Login";
import Navbar from './components/Navbar';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import OneBlog from "./components/OneBlog";

function App() {
  return (
    <Router >
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/blog/:id' element={<OneBlog />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
  )
}

export default App
