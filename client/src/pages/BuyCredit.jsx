// import React, { useContext } from 'react';
// import { AppContext } from '../context/AppContext';

// const plans = [
//   {
//     title: 'Basic',
//     description: 'Best for personal use.',
//     price: '$10',
//     credits: '100 credits',
//   },
//   {
//     title: 'Advanced',
//     description: 'Best for business use.',
//     price: '$50',
//     credits: '500 credits',
//   },
//   {
//     title: 'Business',
//     description: 'Best for enterprise use.',
//     price: '$250',
//     credits: '5000 credits',
//   },
// ];

// export default function BuyCredit() {
//   const { user } = useContext(AppContext); // ✅ hook is now in component body

//   return (
//     <div className="bg-green-50 min-h-screen py-16 px-4 text-center">
//       <button className="px-5 py-2 border rounded-full text-gray-700 border-gray-300 mb-6 hover:bg-gray-100 transition">
//         OUR PLANS
//       </button>
//       <h2 className="text-3xl font-semibold text-gray-800 mb-12">Choose the plan</h2>

//       <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
//         {plans.map((plan, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-xl shadow-md p-8 text-left border hover:border-gray-300 transform transition-transform duration-300 hover:-translate-y-2"
// >
//             <div className="text-blue-600 mb-4">
//               <img src="/favicon.svg" alt=""/>
//             </div>
//             <h3 className="text-lg font-semibold mb-1">{plan.title}</h3>
//             <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
//             <p className="text-2xl font-bold text-gray-800 mb-1">{plan.price}</p>
//             <p className="text-sm text-gray-500 mb-6">/ {plan.credits}</p>
//             <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
//               {user ? 'Purchase' : 'Get started'}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const plans = [
  {
    title: 'Basic',
    description: 'Best for personal use.',
    price: '$10',
    credits: '100 credits',
  },
  {
    title: 'Advanced',
    description: 'Best for business use.',
    price: '$50',
    credits: '500 credits',
  },
  {
    title: 'Business',
    description: 'Best for enterprise use.',
    price: '$250',
    credits: '5000 credits',
  },
];

export default function BuyCredit() {
  const { user } = React.useContext(AppContext);
  const handlePurchase = async (planName,userId) => {
    try {
      const res = await axios.post('http://localhost:4000/api/payment/create-checkout-session', {
        plan: planName,
        userId: userId, // Use user ID if available, otherwise 'unknown'
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        toast.error("Checkout session failed to return a URL");
      }
    } catch (err) {
      console.error("Stripe checkout error:", err);
      toast.error("Failed to create checkout session");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen py-16 px-4 text-center">
      <button className="px-5 py-2 border rounded-full text-gray-700 border-gray-300 mb-6 hover:bg-gray-100 transition">
        OUR PLANS
      </button>
      <h2 className="text-3xl font-semibold text-gray-800 mb-12">Choose the plan</h2>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-8 text-left border hover:border-gray-300 transform transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="text-blue-600 mb-4">
              <img src="/favicon.svg" alt="" />
            </div>
            <h3 className="text-lg font-semibold mb-1">{plan.title}</h3>
            <p className="text-sm text-gray-500 mb-6">{plan.description}</p>
            <p className="text-2xl font-bold text-gray-800 mb-1">{plan.price}</p>
            <p className="text-sm text-gray-500 mb-6">/ {plan.credits}</p>
            <button
              onClick={() => handlePurchase(plan.title,user?._id)}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              {user ? 'Purchase' : 'Get started'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
