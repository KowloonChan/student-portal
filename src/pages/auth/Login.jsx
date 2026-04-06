import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginApi } from "../../api/auth";
import { setAuthToken } from "../../api/client"; // Ensure client.js gets the token

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Call your real backend API
      const data = await loginApi(email, password);

      // 2. Save the token into the API client memory so future requests work
      setAuthToken(data.token);

      // 3. Update your React Context state
      login(data.token, data.user);

      // 4. REDIRECT! (I uncommented this and added role-based routing)
      if (data.user.role === "Admin") {
        navigate("/admin", { replace: true }); // Change to your admin route if different
      } else {
        navigate("/", { replace: true }); // Change to your student dashboard route if different
      }
    } catch (err) {
      // 5. Show the error if they type the wrong password!
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">EduPortal</h1>
          <p className="text-slate-500 mt-2">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="student@college.edu"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 transform active:scale-95 transition-all shadow-lg shadow-indigo-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <p className="text-xs text-amber-800 font-medium mb-1">
            Real Postgres Testing Credentials:
          </p>
          <p className="text-xs text-amber-700">
            Student: student@college.edu / password123
          </p>
          <p className="text-xs text-amber-700">
            Admin: admin@college.edu / password123
          </p>
        </div>
      </div>
    </div>
  );
}
