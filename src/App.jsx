
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'


function App() {

  return (
    <>
      {/* <h1>Welcome Owner-Desk Project!</h1> */}
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </>
  )
}

export default App
