// import userModel from "../models/userModel.js";
// import FormData from "form-data";
// import axios from "axios";

// export const generateImage = async (req, res) => {
//   try {
//     console.log("Raw req.body:", req.body);
//     const { userId, prompt } = req.body;
//     const user = await userModel.findById(userId);
//     console.log("User:", user,prompt);
//     if (!user || !prompt) {
//       return res.json({ message: "User/Prompt not found" });
//     }

//     if (user.creditBalance === 0 || user.creditBalance < 0) {
//       return res.json({
//         message: "Insufficient credit balance",
//         success: false,
//         creditBalance: user.creditBalance,
//       });
//     }

//     const formData = new FormData();
//     formData.append("prompt", prompt);

// const { data } = await axios.post(
//   "https://clipdrop-api.co/text-to-image/v1",
//   formData,
//   {
//     headers: {
//       ...formData.getHeaders(),
//       "x-api-key": process.env.CLIPDROP_API,
//     },
//     responseType: "arraybuffer",
//   }
// );


//     const base64Image = Buffer.from(data, "binary").toString("base64");
//     const resultImage = `data:image/png;base64,${base64Image}`;

//     await userModel.findByIdAndUpdate(user._id, {
//       creditBalance: user.creditBalance - 1,
//     });

//     res.json({
//       success: true,
//       resultImage,
//       creditBalance: user.creditBalance - 1,
//       message: "Image generated successfully",
//     });
//   } catch (error) {
//     console.error("Error in generateImage:", error.message);
//     if (error.response) {
//       console.error("Response data:", error.response.data.toString());
//       console.error("Status:", error.response.status);
//       console.error("Headers:", error.response.headers);
//     }
//     return res.status(500).json({ message: "Internal server error", success: false });
//   }
  
// };


// import userModel from "../models/userModel.js";
// import FormData from "form-data";
// import axios from "axios";

// export const generateImage = async (req, res) => {
//   try {
//     console.log("Raw req.body:", req.body);
//     const { userId, prompt } = req.body;
//     console.log("User:", userId, "Prompt:", prompt);
//     if (!userId || !prompt) {
//       return res.status(400).json({ message: "User ID and prompt are required", success: false });
//     }

//     const user = await userModel.findById(userId);
    

//     if (!user) {
//       return res.status(404).json({ message: "User not found", success: false });
//     }

//     if (user.creditBalance <= 0) {
//       return res.json({
//         message: "Insufficient credit balance",
//         success: false,
//         creditBalance: user.creditBalance,
//       });
//     }

//     const formData = new FormData();
//     formData.append("prompt", prompt);

//     const { data } = await axios.post(
//       "https://clipdrop-api.co/text-to-image/v1",
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//           "x-api-key": process.env.CLIPDROP_API, // make sure this is defined in .env
//         },
//         responseType: "arraybuffer",
//       }
//     );

//     const base64Image = Buffer.from(data, "binary").toString("base64");
//     const resultImage = `data:image/png;base64,${base64Image}`;

//     // Update credit balance
//     const newCredit = user.creditBalance - 1;
//     await userModel.findByIdAndUpdate(user._id, { creditBalance: newCredit });

//     res.json({
//       success: true,
//       resultImage,
//       creditBalance: newCredit,
//       message: "Image generated successfully",
//     });
//   } catch (error) {
//     console.error("Error in generateImage:", error.message);
//     if (error.response) {
//       console.error("Response data:", error.response.data.toString());
//       console.error("Status:", error.response.status);
//       console.error("Headers:", error.response.headers);
//     }
//     return res.status(500).json({ message: "Internal server error", success: false });
//   }
// };


import userModel from '../models/userModel.js';
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const user = await userModel.findById(req.user.id);
    console.log("User:", user, "Prompt:", prompt); 
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required', success: false });
    }

             
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    if (user.creditBalance <= 0) {
      return res.json({
        message: 'Insufficient credit balance',
        success: false,
        creditBalance: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': process.env.CLIPDROP_API,
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    const newCredit = user.creditBalance - 1;
    await userModel.findByIdAndUpdate(user._id, { creditBalance: newCredit });

    res.json({
      success: true,
      resultImage,
      creditBalance: newCredit,
      message: 'Image generated successfully',
    });
  } catch (error) {
    console.error('Error in generateImage:', error.message);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};