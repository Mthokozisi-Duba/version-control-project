import React from "react";
import { Link } from "react-router";

const Home = () => {
	return (
		<div>
			<img src="/plant.jpeg" alt="Plant" style={{
				width: "100px",
				height: "auto"
			}} />
			<p>Student Name uXXXXXXXX</p>
			<Link to="/plants" style={{"padding": "5px"}}>Plants</Link>

		</div>
	);
}

export default Home;
