// src/page/Login.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      toast.success(`Welcome, ${user.displayName}`);
      console.log(user);
      navigate("/home"); // ✅ redirect to home after login
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-In failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]  bg-[#f9fafe] overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign in</h2>
        <h4 className="text-md mb-4 text-gray-600">
          Please sign in to generate post or click logo to navigate to home.
        </h4>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 border hover:bg-red-300 hover:border-none text-black font-semibold px-4 py-2 rounded-md w-full transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Logo"
            className="h-5 w-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
