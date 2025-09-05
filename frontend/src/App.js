import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//import components and pages
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Splash from "./pages/Splash";
import Project from "./pages/Project";


function App(){
	return (
		<BrowserRouter>
			<NavBar />

			<Routes>
				<Route path="/" element={<Splash />} />
				<Route path="/home" element={<Home />} />
				<Route path="/profile/:userID" element={<Profile />} />
				<Route path="/Signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/project/:projectID" element={<Project />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
