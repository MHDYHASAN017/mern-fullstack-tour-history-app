import React from "react";
import './profileBookings.css'
import { Link, Route, Routes } from "react-router-dom";
import MyBookings from "../MyBookings/MyBookings";
import Profile from "../Profile/Profile.js"

const ProfileBookings = () => {
  return (
    <div className="container">
      <Link to="profile" className="profile__options">Profile</Link>
      <Link to="bookings" className="profile__options">Bookings</Link>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>
    </div>
  );
};

export default ProfileBookings;
