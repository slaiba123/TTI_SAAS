import React, { createContext, use, useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// Create the context
export const AppContext = createContext();

// Create the provider
const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [credit, setCredit] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate= useNavigate();
  const loadCreditsData = async () => {
      try{
        const {data}= await axios.get(backendUrl + '/api/user/credits', {headers:{Authorization:`Bearer ${token}`}})

        if(data.success) {
          setCredit(data.credits);
          setUser(data.user);
        }
      }
      catch(err) {
        console.error("Error loading credits data:", err);
        toast.error("Failed to load credits data");
      }

  }
  // const generateImage=async (prompt) => {
  //   try{
  //     const {data}= await axios.get(backendUrl + '/api/image/generate-image',{prompt} ,{headers:{Authorization:`Bearer ${token}`}})

  //     if(data.success) {
  //       loadCreditsData();
  //       return data.resultImage
  //     } else {
  //       toast.error("Failed to generate image");
  //       loadCreditsData();
  //       if(data.creditBalance===0){
  //         navigate('/buycredit');
  //       }
  //     }
  //   }
  //   catch(err) {
  //     console.error("Error generating image:", err);
  //     toast.error("Failed to generate image");

  // }}

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/image/generate-image',
        { prompt},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error("Failed to generate image");
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate('/buycredit');
          toast.error("Insufficient credits. Please buy more credits.");
        }
      }
    } catch (err) {
      console.error("Error generating image:", err);
      toast.error("Failed to generate image");
    }
  };
  

 const logout = () => {
    setUser(null);
    setToken(null);
    setCredit(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  }     

  useEffect(() => {
    if(token) {
      loadCreditsData();
    }

  }, [token]);


  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit, 
    setCredit,
    loadCreditsData,
    logout,
    generateImage
  };
  
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
