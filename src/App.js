import './App.css';
import Header from "./Header";
import SearchBar from "./SearchBar";
import GameGrid from "./GameGrid";
import Paginator from "./Paginator";
import Footer from "./Footer";
import NoGames from "./NoGames";
import React, {useState, useEffect} from "react";
import {HTTPError, getGames} from "./model";

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
		
		setIsLoading(true);
		getGames(searchTerm, page).then((rdata) => {
			setGameData(rdata['games']);
			setPage(rdata['page']);
			setTotalPages(rdata['total_pages']);
		}).catch((error) => {
			if (error instanceof HTTPError) {
				console.log(error.statusCode);
			}
		}).finally(setIsLoading(false));
	}

	const handleSearch = () => {
		// Decides whether to make a request to the API depending
		// on what was entered in the search bar
		if (searchTerm !== null && searchTerm !== "") {
			pullData(searchTerm, 1)
		} else if (searchTerm === "") {
			pullData(null, 1)
		}
	}

	const handlePageSwitch = (page) => {
		// Decides how to make an API request after a page switch
		// (i.e. do we fetch another page of search-filtered
		// games or not?)
		if (searchTerm !== null && searchTerm !== "") {
			// Fetch filtered data at the new page
			pullData(searchTerm, page);
		} else {
			// Fetch unfiltered data at the new page
			pullData(null, page)
		}
	}

	useEffect(() => {
		pullData(searchTerm, page);
	}, [page]);

	return (
		<div>
			<Header />
			<SearchBar searchHandler={handleSearch} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
			{(!isLoading && gameData.length > 0) ?
			<>
			<GameGrid gameData={gameData}/>
			<Paginator 
				totalPages={totalPages}c
				currentPage={page}
				pageSwitchHandler={handlePageSwitch}
			/>
			</> :
			<NoGames 
				reason={searchTerm ? "searchFailed" : "noGames"}
			/>
			}
			<Footer />
		</div>
	)
}

export default App;
