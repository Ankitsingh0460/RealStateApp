import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Header from "./component/Header";
import PrivateRoute from "./component/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
