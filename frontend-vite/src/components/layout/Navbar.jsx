// import { Heart } from "lucide-react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <header className="bg-white border-b shadow-sm">
//       <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="flex items-center space-x-2 text-red-600 font-bold text-xl">
//           <div className="bg-red-100 p-2 rounded-full">
//             <Heart size={20} strokeWidth={2.5} />
//           </div>
//           <span>ResQGo</span>
//         </Link>

//         {/* Right Buttons */}
//         <div className="flex items-center space-x-4">
//           <Link to="/login" className="text-black hover:underline">
//             Login
//           </Link>
//           <Link
//             to="/register"
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

// import { Heart } from "lucide-react"; // using Lucide for the heart icon
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="flex items-center justify-between px-8 py-4 shadow-sm border-b">
//       {/* Left - Logo */}
//       <div className="flex items-center space-x-2">
//         <div className="bg-red-600 rounded-full p-2">
//           <Heart className="text-white w-5 h-5" />
//         </div>
//         <span className="text-red-600 font-bold text-xl">ResQGo</span>
//       </div>

//       {/* Right - Auth Buttons */}
//       <div className="flex items-center space-x-6">
//         <Link to="/login" className="text-black font-medium">
//           Login
//         </Link>
//         <Link
//           to="/signup"
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition"
//         >
//           Sign Up
//         </Link>
//       </div>
//     </nav>
//   );
// }

import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-sm border-b bg-white">
      {/* Left - Logo */}
      <div className="flex items-center space-x-2">
        <div className="bg-red-600 rounded-full p-2">
          <Heart className="text-white w-5 h-5" />
        </div>
        <span className="text-red-600 font-bold text-xl">ResQGo</span>
      </div>

      {/* Right - Auth Buttons */}
      <div className="flex items-center space-x-6">
        <Link
          to="/login"
          className="text-black font-medium underline hover:text-red-600 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
