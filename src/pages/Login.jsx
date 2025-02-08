import { githubLogin } from "../services/appwrite";

export default function Login() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Login</h1>
      <div className="mt-4 space-y-4">
        <button
          onClick={githubLogin}
          className="w-full p-2 bg-gray-800 text-white rounded"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
}
