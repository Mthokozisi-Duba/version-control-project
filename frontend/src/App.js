/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//import components and pages
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
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
				<Route path="/home" element={
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				} />
				<Route path="/profile/:userID" element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/project/:id" element={
					<ProtectedRoute>
						<Project />
					</ProtectedRoute>
				} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
