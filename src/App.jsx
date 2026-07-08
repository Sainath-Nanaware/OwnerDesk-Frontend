
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import SignUp from './pages/SignUp'
//tostify 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import OwnerHomePage from './pages/owner/OwnerHomePage';


function App() {

  return (
    <>
      {/* <h1>Welcome Owner-Desk Project!</h1> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/ownerhome' element={<OwnerHomePage/>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
