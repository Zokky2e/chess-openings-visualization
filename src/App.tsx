/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import { ChessOpening } from "./models/ChessOpening";
import json from "./assets/chess_openings.json";
import ChessBoard from "./components/ChessBoard";
import PieChart from "./components/PieChart";
import BarGraph from "./components/BarGraph";
import MoveNavigation from "./components/MoveNavigation";
import {
	ChessBoardTile,
	startingChessBoardTiles,
} from "./models/StartingChessBoardTiles";
import GetChessboardMove from "./hooks/useChessboardMove";

function App() {
	const [chessOpenings, setChessOpenings] = useState<ChessOpening[]>([]);
	const [query, setQuery] = useState<string>("");
	const [selectedOpenings, setSelectedOpenings] = useState<ChessOpening[]>(
		[]
	);
	const [selectedOpeningMoves, setSelectedOpeningsMoves] = useState<string[]>(
		[]
	);
	const [currentMove, setCurrentMove] = useState<number>(-1);
	const [currentChessBoardState, setCurrentChessBoardState] = useState<
		ChessBoardTile[]
	>(JSON.parse(JSON.stringify(startingChessBoardTiles)));
	useEffect(() => {
		getJSON();
	}, [query]);

	async function getJSON() {
		const filteredChessOpenings = json.filter((cp) =>
			cp.opening_name
				.toLowerCase()
				.replaceAll(" ", "")
				.includes(query.toLowerCase().replaceAll(" ", ""))
		);
		setChessOpenings(filteredChessOpenings);
	}
	function checkIfSelected(name: string) {
		return selectedOpenings.some(
			(opening) => opening.opening_name === name
		);
	}

	useEffect(() => {
		if (selectedOpenings.length === 1) {
			const moves = getSanitizedMoves(selectedOpenings[0].moves_list);
			setSelectedOpeningsMoves(moves);
			setCurrentMove(-1);
			setCurrentChessBoardState(
				JSON.parse(JSON.stringify(startingChessBoardTiles))
			);
		}
	}, [selectedOpenings]);

	function handleChessState() {
		if (selectedOpenings.length === 1) {
			const currentState = GetChessboardMove({
				currentBoardState: currentChessBoardState,
				moves: getSanitizedMoves(selectedOpenings[0].moves_list),
				currentMove: currentMove,
			});
			setCurrentChessBoardState(currentState.boardTiles);
		}
	}
	useEffect(() => {
		handleChessState();
	}, [currentMove]);

	function getSanitizedMoves(opening_moves: string) {
		const move_list = opening_moves.replace(/'/g, '"');
		const moves: string[] = JSON.parse(move_list);
		const sanitizedMoves = moves.map((move) => move.replace(/^\d+\./, ""));
		return sanitizedMoves;
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
					<div className="search-query">
						<label htmlFor="query">Search:</label>
						<input
							style={{
								width:
									selectedOpenings.length !== 0
										? " 200px"
										: "",
							}}
							id="query"
							type="text"
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
							}}
						/>
					</div>
					{selectedOpenings.length !== 0 && (
						<button
							onClick={() => {
								setSelectedOpenings([]);
							}}
						>
							Reset
						</button>
					)}
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
						<h2>My chess openings visualisation</h2>
					</div>
				</div>
			)}
			{selectedOpenings.length === 1 && (
				<div id="main" className="main">
					<div id="chessboard-container">
						<div>
							<ChessBoard
								chessOpening={selectedOpenings[0]}
								chessBoardTiles={currentChessBoardState}
							/>
						</div>
					</div>
					<div className="navigation-arrows">
						<MoveNavigation
							moves={selectedOpeningMoves}
							currentMove={currentMove}
							updateCurrentMove={(value: number) => {
								setCurrentMove(value);
							}}
						/>
					</div>
					<div>
						<div id="graphs-container" className="graphs">
							<PieChart chessOpening={selectedOpenings[0]} />
							<BarGraph chessOpenings={selectedOpenings} />
						</div>
					</div>
				</div>
			)}
			{selectedOpenings.length > 1 && (
				<div id="main" className="main">
					<div id="graphs-container">
						<BarGraph chessOpenings={selectedOpenings} />
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
