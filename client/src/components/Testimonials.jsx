import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import profile3 from '../assets/profile_img_1.png';
import profile2 from '../assets/profile_img_2.png';
import profile1 from '../assets/profile_img_1.png';
import { AppContext } from '../context/AppContext';

const testimonials = [
  {
    name: 'Donald Jackman',
    role: 'Graphic Designer',
    image: profile3,
    review:
      "I've been using Snapverse for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: 'Richard Nelson',
    role: 'Content Creator',
    image: profile2,
    review:
      "I've been using Snapverse for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
  {
    name: 'James Washington',
    role: 'Co-Founder',
    image: profile1,
    review:
      "I've been using Snapverse for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
  },
];

const Testimonials = () => {
  const {user,setShowLogin} = useContext(AppContext);
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
    <div className="text-center py-20 px-6">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2">Customer testimonials</h2>
      <p className="text-white mb-10">What Our Users Are Saying</p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((user, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-xl shadow-sm transition-all duration-300 border border-black hover:border  hover:border-white "
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover mb-4"
            />
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-white mb-2">{user.role}</p>

            <div className="flex justify-center text-red-500 text-lg mb-4">
              {'★'.repeat(5)}
            </div>

            <p className="text-sm text-white">{user.review}</p>
          </div>
        ))}
      </div>

      {/* Magic Button Section */}
      <div className="mt-20">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-6">See the magic. Try now</h3>
        <button onClick={onClickHandler} className="bg-black text-white py-3 px-6 rounded-full text-sm sm:text-base hover:scale-105 transition duration-300">
          Generate Images ✨
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
