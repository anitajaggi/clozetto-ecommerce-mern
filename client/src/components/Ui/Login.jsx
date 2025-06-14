import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authLogin } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export const Login = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await authLogin(loginData);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.user });
      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error(err.response.data.message);
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="container pt-15 m-auto">
      <div className="py-3 text-center mt-5">
        <h1 className="heading text-3xl">
          Welcome back! Login to your account.
        </h1>
      </div>
      <div className="flex flex-col mt-5 border w-md m-auto p-5 rounded-md mb-5">
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="mb-3">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="xyz@example.com"
              className="border border-gray-500 w-full p-2 rounded outline-none"
              autoComplete="email"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="**********"
              className="border border-gray-500 w-full p-2 rounded outline-none"
              autoComplete="current-password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Login
          </button>

          <div className="flex justify-between mt-5">
            <p className="text-sm">Don't have an account?</p>
            <NavLink to={"/register"} className="text-sm text-blue-500">
              Register
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
