import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signoutStart,
  signoutFailure,
  signoutSuccess,
} from "../redux/user/userSlice";

function Profile() {
  const { currentUser } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/auth/signout");
      const data = res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess());
    } catch (error) {
      dispatch(signoutFailure(data.message));
    }
  };
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>

        <form className="flex flex-col gap-4">
          <img
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
            src={currentUser.avatar}
            alt="profile"
          />
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg "
            id="username"
          />
          <input
            type="text"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
          />
          <input
            type="text"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80 uppercase">
            UPDATE
          </button>
        </form>
        <div className="flex justify-between mt-3">
          <span className="text-red-700 cursor-pointer">Delete account?</span>
          <span
            onClick={handleSignout}
            className="text-red-700 cursor-pointer "
          >
            Sign out
          </span>
        </div>
      </div>
    </>
  );
}

export default Profile;
