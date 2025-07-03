import React,{useContext} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { AppContext } from './context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  const { showLogin } = useContext(AppContext);
  return (
    <div>
      <div className='px-4 sm:px-10 md:px-14 1g:px-28 min-h-screen bg-gradient-to-b  from-black to-gray-500'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      {showLogin && <Login/>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/result" element={<Result/>} />
        <Route path="/buycredit" element={<BuyCredit/>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      </div>

    </div>
  )
}

export default App