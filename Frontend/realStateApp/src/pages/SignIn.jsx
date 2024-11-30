import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault;
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const data1 = await res.json();
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80 uppercase">
            Sign In
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p className="">Create an account?</p>
          <Link to="/signup">
            <span className="text-blue-700 ">Sign up</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignIn;
