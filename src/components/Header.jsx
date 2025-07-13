import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { logo } from "../assets";

const MotionLink = motion(Link);

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-white via-blue-50 to-white shadow-md px-6 sm:px-12 py-4 border-b border-[#e6ebf4] z-50 sticky top-0"
    >
      {/* Logo */}
      <Link to="/">
        <motion.img
          src={logo}
          alt="logo"
          className="w-36 sm:w-40 object-contain hover:scale-105 transition-transform duration-300"
          whileHover={{ rotate: 2 }}
        />
      </Link>

      {/* Buttons and User Info */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {user && (
          <div className="text-sm sm:text-base font-medium text-gray-700">
            👤 {user.displayName}
          </div>
        )}

        <MotionLink
          to="/create-post"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:from-indigo-600 hover:to-purple-700"
        >
          🚀 Create Post
        </MotionLink>

        {user && (
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-medium transition"
          >
            Logout
          </button>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
