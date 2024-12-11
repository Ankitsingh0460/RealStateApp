import React from "react";

function CreateListing() {
  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Create a Listing
        </h1>
        <form className="flex flex-col sm:flex-row">
          <div className="flex flex-col gap-4 flex-1">
            <input
              placeholder="Name"
              type="text"
              className="border p-3 rounded-lg "
              id="name"
              maxLength="62"
              minLength="10"
              required
            />
            <textarea
              placeholder="discription"
              type="text"
              className="border p-3 rounded-lg "
              id="discription"
              required
            />
            <input
              placeholder="Address"
              type="text"
              className="border p-3 rounded-lg "
              id="address"
              required
            />
            <div></div>
          </div>
        </form>
      </main>
    </>
  );
}

export default CreateListing;
