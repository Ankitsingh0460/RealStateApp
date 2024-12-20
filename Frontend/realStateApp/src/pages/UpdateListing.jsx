import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateListing() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((s) => s.user);
  const [formData, setFormData] = useState({
    imageUrls: [
      "https://sharpframemedia.com/wp-content/uploads/2020/02/SharpFrameMedia-TwilightPhotography-1.jpg",
      "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  console.log(formData);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;

      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "offer" ||
      e.target.id === "furnished"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discounted price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();

      setResData(data);

      setLoading(false);
      if (data.success === false) {
        setError(data.messages);
      }
      navigate(`/listing/${data.updateListing._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Update Listing
        </h1>
        {error && (
          <p className="text-red-700 text-center font-bold text-lg mt-1 mb-6">
            {error}
          </p>
        )}
        {resData && (
          <p className="text-green-700 font-bold text-2xl text-center mt-1 mb-6">
            {resData.message}
          </p>
        )}
        <form
          className="flex flex-col sm:flex-row gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4 flex-1">
            <input
              placeholder="Name"
              type="text"
              className="border p-3 rounded-lg "
              id="name"
              maxLength="62"
              minLength="5"
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              placeholder="description"
              type="text"
              className="border p-3 rounded-lg "
              id="description"
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              placeholder="Address"
              type="text"
              className="border p-3 rounded-lg "
              id="address"
              required
              onChange={handleChange}
              value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="10"
                  max="100000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="100000"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted Price</p>
                    <span className="text-xs">($ / month)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:{" "}
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max-6)
              </span>
            </p>

            <div className="flex gap-4">
              <input
                className="p-3 border border-gray-300 rounded w-full "
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 "
              >
                Upload
              </button>
            </div>
            <div className="flex gap-4">
              <img
                src="https://sharpframemedia.com/wp-content/uploads/2020/02/SharpFrameMedia-TwilightPhotography-1.jpg"
                alt="listing image"
                className="w-20 h-20 object-contain rounded-lg"
              />
              <img
                src="https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="listing image"
                className="w-20 h-20 object-contain rounded-lg"
              />
              <img
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="listing image"
                className="w-20 h-20 object-contain rounded-lg"
              />
              <img
                src="https://images.pexels.com/photos/87223/pexels-photo-87223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="listing image"
                className="w-20 h-20 object-contain rounded-lg"
              />
            </div>

            <button
              disabled={loading}
              className="p-3 bg-blue-700 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80 mt-2"
            >
              {loading ? "Updating..." : "Update Listing"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default UpdateListing;
