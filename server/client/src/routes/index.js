import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "../App";
import SignUp from "../signup";
import SignUp2 from "../signup2";
import LoginPage from "../pages/join/LoginPage";
import SignUpPage from "../pages/join/SignUpPage";
import ProfilePage from "../pages/mypage/ProfilePage";
import HomePage from "../pages/home/HomePage";
import TodayMusicPage from "../pages/recommend/TodayMusicPage";
import SettingPage from "../pages/settings/SettingPage";
import ProfileEditPage from "../pages/settings/ProfileEditPage";
import PwdEditPage from "../pages/settings/PwdEditPage";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp2 />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/today-music" element={<TodayMusicPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/settings/profile-edit" element={<ProfileEditPage />} />
        <Route path="/settings/password-edit" element={<PwdEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
