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
import SearchResultPage from "../pages/home/SearchResultPage";
import FeedResult from "../pages/mypage/FeedResult";
import UserFollowingPage from "../pages/user/UserFollowingPage";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp2 />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:nickname" element={<ProfilePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/today-music" element={<TodayMusicPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/settings/profile-edit" element={<ProfileEditPage />} />
        <Route path="/settings/password-edit" element={<PwdEditPage />} />
        <Route path="/search-result" element={<SearchResultPage />} />
        <Route path="/feed-result/:id" element={<FeedResult />} />

        <Route path="/profile/following" element={<UserFollowingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
