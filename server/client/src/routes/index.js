import React from "react";
import {Route,BrowserRouter,Routes} from "react-router-dom";
import App from "../App";
import SignUp from "../signup";
import SignUp2 from "../signup2";

export default function RootRoute() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUp2/>}/>
            <Route path="/auth/sign-up" element={<SignUp/>}/>
            
            </Routes>
            </BrowserRouter>
            
    );
}