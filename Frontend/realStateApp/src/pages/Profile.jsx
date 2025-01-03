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
  const [showListingError, setShowListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);
  const [deleteUserListing, setDeleteUserListing] = useState();
  const [updateError, setUpdateError] = useState(false);

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

  const handleListingClick = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListing(data);
    } catch (error) {
      setShowListingError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setDeleteUserListing(data);

      setUserListing((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleListingEdit = async (listingId) => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-4">Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <img
            className="rounded-full h-24 w-24 object-cover  self-center"
            src={currentUser.avatar}
            alt="profile"
          />
          <p className="text-red-700 text-center">{error ? error : ""}</p>
          <p className="text-green-700 text-center">
            {updateSuccesss ? "User is updated successfully!" : ""}
          </p>
          <p className="text-red-700  text-center">
            {showListingError ? "Error in Showing listing" : ""}
          </p>
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

        <button
          onClick={handleListingClick}
          className="mt-4 text-white w-full border p-1 bg-blue-700 rounded-full uppercase"
        >
          Show Listing
        </button>

        {userListing && userListing.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-center mt-7 text-2xl font-semibold">
              Your Listings
            </h1>
            {deleteUserListing && (
              <p className="text-red-700 text-center">
                {deleteUserListing.message}
              </p>
            )}
            {userListing.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[3]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button
                      onClick={() => handleListingEdit(listing._id)}
                      className="text-green-700 uppercase"
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
