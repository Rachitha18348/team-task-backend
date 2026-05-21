import { useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      // ✅ STORE TOKEN + USER
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert(response.data.message);

      console.log(response.data);

      // ✅ FORCE UI RELOAD AFTER LOGIN
      window.location.reload();

    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error.response);
      alert(error?.response?.data?.message || error.message);
    }

  };

  // ✅ CHECK LOGIN STATUS
  const user = localStorage.getItem("user");

  // 👉 IF LOGGED IN SHOW DASHBOARD
  if (user) {
    return <Dashboard />;
  }

  // 👉 ELSE SHOW LOGIN PAGE
  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mt-6 p-3 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mt-4 p-3 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>

      </div>

    </div>

  );
}

export default App;