import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authRegister } from "../../api/api";
import { toast } from "react-toastify";

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authRegister(registerData);
      navigate("/login");
      toast.success(res.message);
    } catch (err) {
      toast.error(err.response.data.message);
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <div className="container pt-15 m-auto">
      <div className="py-3 text-center mt-5">
        <h1 className="heading text-3xl">Welcome! Create your accornt.</h1>
      </div>
      <div className="flex flex-col mt-5 border w-md m-auto p-5 rounded-md mb-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="text-sm">
              Full Name
            </label>
            <br />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="John Doe"
              className="border border-gray-500 w-full p-2 rounded outline-none"
              value={registerData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <br />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="xyz@example.com"
              className="border border-gray-500 w-full p-2 rounded outline-none"
              value={registerData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="text-sm">
              Contact
            </label>
            <br />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="000 000 0000"
              className="border border-gray-500 w-full p-2 rounded outline-none"
              value={registerData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <br />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="**********"
              className="border border-gray-500 w-full p-2 rounded outline-none"
              value={registerData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="btn-primary w-full">Register</button>
          </div>
          <div className="flex justify-between mt-5">
            <p className="text-sm">Already have an account?</p>
            <NavLink to={"/login"} className="text-sm text-blue-500">
              Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};
