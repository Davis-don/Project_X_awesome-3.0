
import './App.css';
import Homescreen from './Pages/Homescreen';
import Login from './Components/UI/Dual/Login';
import Openaccount from './Components/UI/Clients/Openaccount';
import Clientdash from './Pages/Clientdash';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Testimonials from './Pages/Testimonials';
import Employeesdash from './Pages/Employeedashboard';
import Employeeshire from './Components/UI/Employees/Employeeshire';
import Start from './Components/Start';

function App() {
  return (
    <div className="App">
         <Router>
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/openaccount" element={<Openaccount />} />
        <Route path="/Client/Account" element={<Clientdash />} />
        <Route path="/Testimonials" element={<Testimonials />} />
        <Route path="/Employee/login" element={<Employeesdash/>}/>
        <Route path="/Employee/Hire" element={<Employeeshire/>}/>
        <Route path="/Start" element={<Start />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
