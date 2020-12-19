import './App.css';
import Header from "./Header";
import SearchBar from "./SearchBar";
import GameGrid from "./GameGrid";
import Paginator from "./Paginator";
import Footer from "./Footer";
import React, {useState, useEffect} from "react";

function App() {

	// Set up state hooks -- App will be the component which
	// owns state for game data and will handle fetching
	const [gameData, setGameData] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * Fetches data from the API and populates the data in
	 * state, depending on what was passed in.
	 * @param {*} searchTerm 
	 * @param {*} page 
	 */
	function pullData(searchTerm = null, page = null) {
		fetch(`${process.env['REACT_APP_API_URL']}/games?page=${page}`)
			.then((response) => response.json())
			.then((rdata) => {
				setGameData(rdata['games']);
				setPage(rdata['page']);
				setTotalPages(rdata['total_pages']);
			});
	}

	useEffect(() => {
		pullData(null, page);
	}, [page]);

	return (
		<div>
			<Header />
			<SearchBar />
			<GameGrid gameData={gameData}/>
			<Paginator totalPages={totalPages} currentPage={page} pageSetter={setPage}/>
			<Footer />
		</div>
	)
}

export default App;
