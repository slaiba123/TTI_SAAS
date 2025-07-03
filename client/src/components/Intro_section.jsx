import React from 'react';
import { assets } from '../assets/assets'; 
const IntroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-20 max-w-6xl mx-auto">
      
     
      <div className="w-full md:w-1/2">
        <img
          src={assets.sample_img_1} 
          alt="AI Generated"
          className="rounded-xl w-full object-cover"
        />
      </div>

    
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-2">
          Create AI Images
        </h2>
        <p className="text-gray-500 mb-6">Turn your imagination into visuals</p>

        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
          Introducing the AI-Powered Text to Image Generator
        </h3>

        <p className="text-gray-600 leading-relaxed">
          Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
        </p>

        <p className="text-gray-600 mt-4 leading-relaxed">
          Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don’t yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!
        </p>
      </div>
    </div>
  );
};

export default IntroSection;
