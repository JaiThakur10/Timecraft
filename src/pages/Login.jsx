import { githubLogin, googleLogin, discordLogin } from "../services/appwrite";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaGithub, FaDiscord } from "react-icons/fa"; // GitHub & Discord icons

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl text-black font-bold text-center mb-6">
          Login
        </h1>

        {/* Google Button (Centered) */}
        <button
          onClick={googleLogin}
          className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg shadow-md text-gray-700 font-medium hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl mr-2" />
          Google
        </button>

        {/* Divider */}
        <div className="relative flex items-center w-full my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* GitHub & Discord Icon Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={githubLogin}
            className="p-3 bg-gray-200 text-gray-700 rounded-full shadow-md hover:bg-gray-800 hover:text-white transition"
          >
            <FaGithub className="text-2xl" />
          </button>

          <button
            onClick={discordLogin}
            className="p-3 bg-gray-200 text-gray-700 rounded-full shadow-md hover:bg-purple-600 hover:text-white transition"
          >
            <FaDiscord className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
