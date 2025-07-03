import React,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const {user,setShowLogin,logout,credit} = React.useContext(AppContext);
  return (
    <div className='flex items-center justify-between py-4 '> 
    
     <Link to="/">
      <div className='flex items-center gap-2 sm:gap-3 lg:gap-4'>
      <img src={assets.logo_icon} alt="Logo" className='w-10 ' />
     <p className='text-white text-3xl'>Snapverse</p>
      </div>
     
     </Link>


    <div>
    {user?
    <div className=' flex items-center gap-2 sm:gap-3'>
      <button onClick={()=>navigate('/buycredit')} className='flex items-center gap-2 bg-gray-400 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
        <img src={assets.credit_star} alt="" className='w-5'/>
        <p className='text-sm  sm:text-sm font-medium text-white'>credit left:{credit}</p>
      </button>
      <p className='text-gray-600 max-sm:hidden pl-4'>Hi,{user.name}</p>
      <div className='relative group'>
          <img src={assets.profile_icon} className='w-10 drop-shadow' alt=""/>
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
            <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
              <li 
              onClick={logout}
              className='py-1 px-2 cursor-pointer pr-10'>logout</li>
            </ul>
          </div>
      </div>
    </div>
    :
    <div className='flex items-center gap-2 sm:gap-5'>
        <button className='bg-zinc-800 cursor-pointer text-white px-7 py-2 sm:px-10 text-sm rounded-full' onClick={()=>navigate('/buycredit')}>pricing</button>
        <button className='bg-zinc-800 cursor-pointer text-white px-7 py-2 sm:px-10 text-sm rounded-full' onClick={()=>setShowLogin(true)}>login</button>
    </div>
    }
    
    </div>
    </div>
  )
}

export default Navbar