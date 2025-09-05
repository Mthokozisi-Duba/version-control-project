import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Plants from './pages/Plants';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/plants" element={<Plants />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
