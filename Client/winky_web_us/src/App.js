
import './App.css';
import Homescreen from './Pages/Homescreen';
import Login from './Components/UI/Dual/Login';
import Openaccount from './Components/UI/Clients/Openaccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
         <Router>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/openaccount" element={<Openaccount />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
