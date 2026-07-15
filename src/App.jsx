
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import SignUp from './pages/SignUp'
//tostify 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import OwnerHomePage from './pages/owner/OwnerHomePage';
import RoomsDashboard from './pages/room/RoomsDashboard';


function App() {

  return (
    <>
      {/* <h1>Welcome Owner-Desk Project!</h1> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/ownerhome' element={<OwnerHomePage/>}/>
        <Route path='/property/:propertyId/rooms' element={<RoomsDashboard/>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
