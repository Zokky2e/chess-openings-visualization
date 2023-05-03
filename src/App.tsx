/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import { ChessOpening } from "./models/ChessOpening";
import json from "./assets/chess_openings.json";

function App() {
	const [chessOpenings, setChessOpenings] = useState<ChessOpening[]>([]);
	const [query, setQuery] = useState<string>("");
	const [selectedOpening, setSelectedOpening] = useState<ChessOpening>();
	useEffect(() => {
		getJSON();
	}, [query]);

	async function getJSON() {
		const filteredChessOpenings = json.filter((cp) =>
			cp.opening_name.toLowerCase().includes(query)
		);
		setChessOpenings(filteredChessOpenings);
	}

	return (
		<div className="container">
			<div className="filter">
				<div>
					<label htmlFor="query">Search: </label>
					<input
						id="query"
						type="text"
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
						}}
					/>
				</div>
				<div className="list-container">
					<ul>
						{chessOpenings.map((opening, id) => {
							return (
								<li
									key={id}
									onClick={() => setSelectedOpening(opening)}
								>
									<h3>{opening.opening_name}</h3>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="main">
				<div>
					{selectedOpening &&
						Object.entries(selectedOpening).map(
							([key, value], i) => (
								<div key={i}>
									{key} : {value}
								</div>
							)
						)}
				</div>
			</div>
		</div>
	);
}

export default App;
