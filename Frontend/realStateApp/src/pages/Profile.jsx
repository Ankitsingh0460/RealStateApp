import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  signoutStart,
  signoutFailure,
  signoutSuccess,
  updateSuccess,
  updateFailure,
  updateStart,
  deleteUserSuccess,
  deleteUserFailure,
  deleteUserStart,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

function Profile() {
  const { currentUser, loading, error } = useSelector((s) => s.user);
  const [formData, setFormData] = useState({});
  const [updateSuccesss, setUpdateSuccesss] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }
      dispatch(updateSuccess(data));
      setUpdateSuccesss(true);
    } catch (error) {
      dispatch(updateFailure(data.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/auth/signout");
      const data = res.json();

      if (data.success === false) {
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess());
    } catch (error) {
      dispatch(signoutFailure(data.message));
    }
  };

  const handleUserDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <img
            className="rounded-full h-24 w-24 object-cover  self-center"
            src={currentUser.avatar}
            alt="profile"
          />

          <input
            onChange={handleChange}
            type="text"
            placeholder="username"
            defaultValue={currentUser.username}
            className="border p-3 rounded-lg "
            id="username"
          />
          <input
            onChange={handleChange}
            defaultValue={currentUser.email}
            type="text"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-80 uppercase">
            {loading ? "Loading..." : "Update"}
          </button>
          <Link
            className="bg-green-700 p-3 rounded-lg uppercase text-center hover:opacity-95 text-white"
            to={"/create-listing"}
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between mt-3">
          <span
            onClick={handleUserDelete}
            className="text-red-700 cursor-pointer"
          >
            Delete account?
          </span>
          <span
            onClick={handleSignout}
            className="text-red-700 cursor-pointer "
          >
            Sign out
          </span>
        </div>
        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccesss ? "User is updated successfully!" : ""}
        </p>
      </div>
    </>
  );
}

export default Profile;
