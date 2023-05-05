/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import { ChessOpening } from "./models/ChessOpening";
import json from "./assets/chess_openings.json";
import ChessBoard from "./components/ChessBoard";

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
					<label htmlFor="query">Search:</label>
					<br />
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
									onClick={() => {
										console.log(opening);
										setSelectedOpening(opening);
									}}
								>
									<h3>{opening.opening_name}</h3>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div id="main" className="main">
				<div>
					{selectedOpening && (
						<ChessBoard chessOpening={selectedOpening} />
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
