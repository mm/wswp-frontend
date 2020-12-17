import './App.css';
import Header from "./Header";
import GameGrid from "./GameGrid";
import React, {useState, useEffect} from "react";

function App() {

	// Set up state hooks -- App will be the component which
	// owns state for game data and will handle fetching
	const [gameData, setGameData] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// On component mount, we'll perform an initial
		// API fetch to pull data we need through
		fetch(`${process.env['REACT_APP_API_URL']}/games`)
			.then((response) => response.json())
			.then((rdata) => {
				setGameData(rdata['games']);
				setPage(rdata['page']);
				setTotalPages(rdata['total_pages']);
			});
	}, []);

	return (
		<div>
			<Header />
			<GameGrid gameData={gameData}/>
		</div>
	)
}

export default App;
