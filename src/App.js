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
	const [searchTerm, setSearchTerm] = useState('');

	/**
	 * Fetches data from the API and populates the data in
	 * state, depending on what was passed in.
	 * @param {*} searchTerm 
	 * @param {*} page 
	 */
	function pullData(searchTerm = null, page = 1) {
		let requestUrl = `${process.env['REACT_APP_API_URL']}/games?page=${page}`
		if (searchTerm && (searchTerm !== "")) {
			requestUrl = `${process.env['REACT_APP_API_URL']}/games/search?query=${searchTerm}`
		}
		fetch(requestUrl)
			.then((response) => response.json())
			.then((rdata) => {
				console.log(rdata);
				setGameData(rdata['games']);
				setPage(rdata['page']);
				setTotalPages(rdata['total_pages']);
			});
	}

	const handleSearch = () => {
		// Decides whether to make a request to the API depending
		// on what was entered in the search bar
		console.log('Hit handleSearch');
		if (searchTerm !== null && searchTerm !== "") {
			pullData(searchTerm, 1)
		} else if (searchTerm === "") {
			pullData(null, 1)
		}
	}

	useEffect(() => {
		pullData(null, page);
	}, [page]);

	return (
		<div>
			<Header />
			<SearchBar searchHandler={handleSearch} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
			<GameGrid gameData={gameData}/>
			<Paginator totalPages={totalPages} currentPage={page} pageSetter={setPage}/>
			<Footer />
		</div>
	)
}

export default App;
