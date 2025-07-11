 import React,{useContext} from 'react'
 import { useNavigate } from 'react-router-dom'
 import { assets } from '../assets/assets'
 import { motion } from "motion/react"
 import { AppContext } from '../context/AppContext'
 const Header = () => {
    const {user,setShowLogin} = React.useContext(AppContext);
    const navigate = useNavigate();
    const onClickHandler = () => {
    if (user){
        navigate('/result');
    }
    else {
        setShowLogin(true);
    }



    }
   return (
     <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
     >
        < motion.div className='flex flex-col justify-center items-center text-center my-20'
         initial={{ opacity: 0.2, y:-20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay:0.2, duration: 0.8 }}
        >
            <p className='text-black inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>Best text to image generator ✨</p>
            
        </motion.div>
        
        <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center text-gray-600'>Turn Text to <span className='text-white'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
        >Image</span>,in seconds.</h1>
        <motion.p className='text-center max-w-xl mx-auto mt-5 text-gray-600'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        >Unleash your creativity with AI. Turn your imagination into visual art in seconds – just type, and watch the magic happen.</motion.p>
            <motion.button
        className='sm:text-lg mx-auto text-white bg-gray-700 w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
            default: { duration: 0.5 },
            opacity: { delay: 0.8, duration: 1 },
        }}

        onClick={onClickHandler}
        >
            Generate Images ✨
        </motion.button>
        <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-col items-center mt-16">
        <div className='flex flex-wrap justify-center gap-3'>
            {Array(6).fill('').map((item, index) => (
            <motion.img
                whileHover={{ scale: 1.05 ,duration: 0.1 }}
                key={index}
                src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                alt=''
                className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                width={70}
            />
            ))}
        </div>
        <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className='text-center mt-2 text-neutral-600'>
            Generated images from Snapverse
        </motion.p>
        </motion.div>

     </motion.div>
   )
 }
 
 export default Header