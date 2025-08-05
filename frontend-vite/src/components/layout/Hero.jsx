// import { Heart } from "lucide-react";

// const Hero = () => {
//   return (
//     <section className="bg-gradient-to-r from-white via-red-50 to-white py-16">
//       <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-10 gap-10">
        
//         {/* Left content */}
//         <div className="flex-1 text-center md:text-left">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
//             Emergency <br />
//             Medical Services <br />
//             <span className="text-red-600">When You Need It Most</span>
//           </h1>
//           <p className="mt-6 text-gray-600 text-lg">
//             ResQGo provides rapid, reliable ambulance services with professional medical care.
//             Book an ambulance instantly and track your emergency transport in real-time.
//           </p>
//           <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
//             <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg font-semibold shadow">
//               Get Started
//             </button>
//             <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-md text-lg font-semibold shadow">
//               Sign In
//             </button>
//           </div>
//         </div>

//         {/* Right image */}
//         <div className="flex-1 relative">
//           <img
//             src="/images/Ambulance.jpg"
//             alt="Ambulance"
//             className="w-full max-w-md mx-auto rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
//           />

//           {/* Floating Card */}
//           <div className="absolute bottom-[-10px] right-0 sm:right-[-20px] sm:bottom-[-20px] bg-white px-5 py-4 rounded-xl shadow-lg flex items-center gap-4">
//             <div className="bg-red-100 p-2 rounded-full text-red-600">
//               <Heart size={22} />
//             </div>
//             <div>
//               <h4 className="font-semibold text-black">Available 24/7</h4>
//               <p className="text-sm text-gray-500">Emergency Services</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
// import React from "react";
// import { Heart, PhoneCall, MapPin } from "lucide-react";
// import ambulanceImage from "/images/Ambulance.jpg"; // adjust if needed

// const Hero = () => {
//   return (
//     <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-20 bg-white">
//       {/* Left Content */}
//       <div className="max-w-2xl">
//         <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
//           Emergency Medical <span className="block text-red-600">Help,</span>
//         </h1>
//         <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight tracking-tight mt-1">
//           When Every Second Matters
//         </h2>

//         <p className="text-gray-600 text-lg mt-6 leading-relaxed">
//           ResQGo provides rapid, reliable ambulance services with professional
//           care. Book an ambulance instantly and track your emergency transport
//           in real-time.
//         </p>

//         {/* Buttons */}
//         <div className="flex gap-4 mt-6">
//           <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md shadow">
//             Get Started
//           </button>
//           <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-md shadow">
//             Sign In
//           </button>
//         </div>

//         {/* Contact Info */}
//         <div className="flex gap-6 text-gray-800 font-medium pt-6">
//           <div className="flex items-center gap-2">
//             <PhoneCall className="text-red-600 w-5 h-5" />
//             Emergency: 911
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="text-red-600 w-5 h-5" />
//             Available Nationwide
//           </div>
//         </div>
//       </div>

//       {/* Right Image + Smaller Badge */}
//       <div className="relative mt-16 md:mt-0">
//         <img
//           src={ambulanceImage}
//           alt="Ambulance"
//           className="w-[520px] max-w-full drop-shadow-2xl rounded-xl"
//         />

//         {/* Smaller, Lower Badge */}
//         <div className="absolute -bottom-16 left-6 bg-white border rounded-lg shadow-sm p-2 flex items-center gap-2 w-[200px]">
//           <div className="bg-gray-100 p-1 rounded-full">
//             <Heart className="text-red-500 w-5 h-5" />
//           </div>
//           <div className="flex flex-col justify-center">
//             <p className="text-sm font-medium text-gray-800 leading-tight">Available 24/7</p>
//             <p className="text-xs text-gray-500">Emergency Services</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Hero() {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-16 bg-white">
//       {/* Left Side: Text Content */}
//       <div className="max-w-xl text-center lg:text-left">
//         <h1 className="text-5xl font-bold text-black leading-tight">
//           Emergency Medical Services
//           <br />
//           <span className="text-red-600">When You Need It Most</span>
//         </h1>
//         <p className="text-gray-500 mt-6 text-lg">
//           ResQGo provides rapid, reliable ambulance services with professional medical care. 
//           Book an ambulance instantly and track your emergency transport in real-time.
//         </p>
//         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//           <button 
//             onClick={() => navigate("/register")} 
//             className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
//           >
//             Get Started
//           </button>
//           <button 
//             onClick={() => navigate("/login")} 
//             className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
//           >
//             Sign In
//           </button>
//         </div>
//         <div className="mt-8 flex flex-col sm:flex-row gap-4 text-sm text-gray-800 font-medium justify-center lg:justify-start">
//           <div className="flex items-center space-x-2">
//             <span>📞</span><span>Emergency: 911</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span>📍</span><span>Available Nationwide</span>
//           </div>
//         </div>
//       </div>

//       {/* Right Side: Image */}
//       <div className="relative mt-10 lg:mt-0">
//         <img
//           src="/images/Ambulance.jpg" // Place your image here (in public/images)
//           alt="Ambulance"
//           className="w-[600px] drop-shadow-xl rounded-3xl"
//         />
//         <div className="absolute bottom-6 left-6 bg-white shadow-lg rounded-xl px-4 py-3 flex items-center space-x-3">
//           <div className="text-red-500 text-2xl">❤️</div>
//           <div>
//             <p className="text-black font-bold">Available 24/7</p>
//             <p className="text-sm text-gray-500">Emergency Services</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-16 bg-white">
      {/* Left Side: Text Content */}
      <div className="max-w-xl text-center lg:text-left">
        <h1 className="text-5xl font-bold text-black leading-tight">
          Emergency Medical Services
          <br />
          <span className="text-red-600">When You Need It Most</span>
        </h1>
        <p className="text-gray-500 mt-6 text-lg">
          ResQGo provides rapid, reliable ambulance services with professional medical care. 
          Book an ambulance instantly and track your emergency transport in real-time.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button 
            onClick={() => navigate("/register")} 
            className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Get Started
          </button>
          <button 
            onClick={() => navigate("/login")} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            Sign In
          </button>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 text-sm text-gray-800 font-medium justify-center lg:justify-start">
          <div className="flex items-center space-x-2">
            <span>📞</span><span>Emergency: 911</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📍</span><span>Available Nationwide</span>
          </div>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="relative mt-10 lg:mt-0">
        <img
          src="/images/Ambulance.jpg"
          alt="Ambulance"
          className="w-[600px] drop-shadow-xl rounded-3xl"
        />
        <div className="absolute -bottom-4 left-4 bg-white shadow-md rounded-lg px-3 py-2 flex items-center space-x-2">
          <div className="text-red-500 text-lg">❤️</div>
          <div>
            <p className="text-sm text-black font-semibold">Available 24/7</p>
            <p className="text-xs text-gray-500">Emergency Services</p>
          </div>
        </div>
      </div>
    </div>
  );
}
