import { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import TokenService from "../services/token.service";
import { useAuthContext } from "../context/AuthContext"; 


const Login = () => {
  const navigate = useNavigate(); 
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuthContext(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((User) => ({ ...User, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(user.username, user.password);
      if (response.status === 200) {
        console.log(response.data);
        login(response.data.user)
        TokenService.setUser(response.data);
        Swal.fire({
          title: "Login Successful",
          text: "Welcome!",
          icon: "success",
        }).then(() => {
          navigate("/Home");
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: response.data.message || "Invalid credentials.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error during login:", error); 
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[30rem] bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="text-center text-4xl font-medium text-indigo-600">
          Log In
        </div>
  
        {/* Username input */}
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-400 focus:outline-none py-2 px-3"
          />
        </div>
  
        {/* Password input */}
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full border-none bg-transparent outline-none placeholder:text-gray-400 focus:outline-none py-2 px-3"
          />
        </div>
  
        {/* Login button */}
        <button
          className="w-full transform rounded-sm bg-indigo-600 py-2 text-white font-bold duration-300 hover:bg-indigo-400 focus:outline-none"
          onClick={handleSubmit}
        >
          LOG IN
        </button>
  
        {/* Create Account section */}
        <p className="text-center text-lg">
          No account?{" "}
          <a
            href="#"
            className="font-medium text-indigo-500 underline hover:text-indigo-400"
          >
            Create
          </a>
        </p>
      </div>
    </section>
  );
  
};

export default Login;
