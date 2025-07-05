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