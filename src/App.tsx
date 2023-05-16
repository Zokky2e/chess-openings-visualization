/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import { ChessOpening } from "./models/ChessOpening";
import json from "./assets/chess_openings.json";
import ChessBoard from "./components/ChessBoard";
import PieChart from "./components/PieChart";
import BarGraph from "./components/BarGraph";

function App() {
	const [chessOpenings, setChessOpenings] = useState<ChessOpening[]>([]);
	const [query, setQuery] = useState<string>("");
	const [selectedOpenings, setSelectedOpenings] = useState<ChessOpening[]>(
		[]
	);
	useEffect(() => {
		getJSON();
	}, [query]);

	async function getJSON() {
		const filteredChessOpenings = json.filter((cp) =>
			cp.opening_name.toLowerCase().includes(query)
		);
		setChessOpenings(filteredChessOpenings);
	}
	function checkIfSelected(name: string) {
		return selectedOpenings.some(
			(opening) => opening.opening_name === name
		);
	}
	return (
		<div
			className={
				selectedOpenings.length !== 0
					? "container"
					: "container-no-content"
			}
		>
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
					<button
						onClick={() => {
							setSelectedOpenings([]);
						}}
					>
						Reset
					</button>
				</div>
				<div className="list-container">
					<ul>
						{chessOpenings.map((opening, id) => {
							return (
								<li
									key={id}
									onClick={() => {
										const indexOfElement =
											selectedOpenings.findIndex(
												(selectedOpening) =>
													opening.opening_name ===
													selectedOpening.opening_name
											);
										if (indexOfElement === -1) {
											setSelectedOpenings((prevState) => [
												...prevState,
												opening,
											]);
										} else {
											setSelectedOpenings((prevState) =>
												prevState.filter(
													(_, index) =>
														index !== indexOfElement
												)
											);
										}
									}}
								>
									<h3
										className={
											checkIfSelected(
												opening.opening_name
											)
												? "selected-opening"
												: ""
										}
									>
										{opening.opening_name}
									</h3>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			{selectedOpenings.length === 0 && (
				<div className="title-card">
					<div>
						<h1>Welcome to</h1>
						<h2> my chess openings clasification</h2>
					</div>
				</div>
			)}
			{selectedOpenings.length === 1 && (
				<div id="main" className="main">
					<div>
						<ChessBoard chessOpening={selectedOpenings[0]} />
					</div>
					<div>
						<div className="graphs">
							<PieChart chessOpening={selectedOpenings[0]} />
							<BarGraph chessOpening={selectedOpenings[0]} />
						</div>
					</div>
				</div>
			)}
			{selectedOpenings.length > 1 && (
				<div id="main" className="main">
					<h2>In development...</h2>
				</div>
			)}
		</div>
	);
}

export default App;
