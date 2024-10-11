import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onVisible = () => {
    setVisible(!visible);
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("user"));
    console.log(users);
    if (users) {
      console.log("user hrer");
      if (users.username === username && users.password === password) {
        console.log(users.username === username);
        localStorage.setItem("isLoggedIn", true);
        alert("Login successful!");
        navigate("/option");
      } else if (users.username === username && users.password !== password) {
        console.log(users.password !== password);
        alert("wrong password");
      }
    } else {
      const newUser = { username, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      console.log(newUser);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      alert("Account created successfully and logged in!");
      navigate("/option");
    }
  };
  return (
    <div className="border w-[50%] rounded-md px-10 py-8 lg:w-[30%] lg:px-10">
      <h1 className="text-center text-lg font-semibold ">Login as</h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="mt-5 flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-sm font-semibold">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Input username"
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-sm px-2 py-1 text-[14px] focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-sm font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Input password"
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-sm px-2 py-1 text-[14px] focus:outline-none w-full"
            />
            <button
              type="button"
              onClick={onVisible}
              className="absolute right-3 z-10 top-0 bottom-0"
            >
              {visible ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        <p className="text-red-600 text-[10px]">
          * if you dont have account before, just fill this form and then
          automatically make one
        </p>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="text-sm font-semibold border-2 rounded-md py-1 px-3 bg-gray-300 text-gray-700 border-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
