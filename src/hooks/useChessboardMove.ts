import { useState } from "react";
import {
	ChessBoardTile,
	startingChessBoardTiles,
} from "../models/StartingChessBoardTiles";

interface ChessBoardMoveProps {
	currentBoardState: ChessBoardTile[];
	moves: string[];
	currentMove: number;
}

function GetChessboardMove(cmp: ChessBoardMoveProps) {
	let newBoardState: ChessBoardTile[] = JSON.parse(
		JSON.stringify(startingChessBoardTiles)
	);
	let moves: string[] = [];
	let isBlack = false;
	if (cmp.currentMove === -1) {
		newBoardState = JSON.parse(JSON.stringify(startingChessBoardTiles));
	} else {
		for (let i = 0; i <= cmp.currentMove; i++) {
			isBlack = i % 2 === 1;
			const currentMove: string = cmp.moves[i];
			if (currentMove.includes("-")) {
				console.log(currentMove);
			} else {
				moves = currentMove.split(/(?=[a-z])/);
				if (moves.length === 1) {
					moves.unshift("P");
				}
				console.log(moves);
				moves = moves.filter((move) => move !== "x");
				console.log(moves);
				if (moves[0] === moves[0].toLowerCase()) {
					moves[0] = "P" + moves[0];
				}

				if (moves.length >= 3) {
					moves = [moves.splice(0, 2).join(""), ...moves];
				}

				console.log(moves);
				if (moves.length === 2) {
					switch (moves[0][0].toLowerCase()) {
						case "p": {
							if (moves[0].length === 1) {
								moves[0] = moves[0] + moves[1][0];
							}
							if (isBlack) moves[0] = moves[0].toLowerCase();
							console.log(moves);
							if (moves[1][0] !== moves[0][1]) {
								const fromTile = newBoardState.findIndex(
									(tile) => {
										let legal: boolean;
										if (isBlack) {
											legal = parseInt(tile.id[1],10) > 
													parseInt(moves[1][1],10)
										} else {
											legal = parseInt(tile.id[1],10) <
													parseInt(moves[1][1],10)
										}
										return (
											tile.id[0] === moves[0][1] &&
											tile.piece === moves[0][0] &&
											legal
										);
									}
								);
								const toTile = newBoardState.findIndex(
									(tile) => {
										return tile.id === moves[1];
									}
								);
								newBoardState[fromTile].piece = "";
								newBoardState[toTile].piece = moves[0][0];
							} else {
								const fromTile = newBoardState.findIndex(
									(tile) => {
										let legal: boolean;
										if (isBlack) {
											legal = parseInt(tile.id[1],10) > 
													parseInt(moves[1][1],10)
										} else {
											legal = parseInt(tile.id[1],10) <
													parseInt(moves[1][1],10)
										}
										return (
											tile.id[0] === moves[1][0] &&
											tile.piece === moves[0][0] &&
											legal
										);
									}
								);
								const toTile = newBoardState.findIndex(
									(tile) => {
										return tile.id === moves[1];
									}
								);
								newBoardState[fromTile].piece = "";
								newBoardState[toTile].piece = moves[0][0];
							}
							break;
						}
						case "n": {
							const knights: number[] = [];
							if (moves[0].length >= 2) {
								newBoardState.forEach((tile, index) => {
									const piece = isBlack
											? moves[0][0].toLowerCase()
											: moves[0][0];
									if(tile.piece === piece && tile.id[0] === moves[0][1]) {
										knights.push(index);
									}
								});
							} else {
								newBoardState.forEach((tile, index) => {
									const piece = isBlack
											? moves[0][0].toLowerCase()
											: moves[0][0];
									if(tile.piece === piece) {
										knights.push(index);
									}
								});
							}
							const toTile = newBoardState.findIndex((tile) => {
								return tile.id === moves[1];
							});
							knights.forEach(knight => {
								if(canKnightMove(newBoardState[knight].id, moves[1])) {
									newBoardState[knight].piece = "";
									newBoardState[toTile].piece = moves[0][0];
									if (isBlack) {
										newBoardState[toTile].piece = newBoardState[toTile].piece.toLowerCase();
									}
								}
							});
							break;
						}
					}
				}
			}
		}
	}
	function getFileRank(position: string) {
		const file = position.charAt(0);
		const rank = parseInt(position.charAt(1), 10);
		return { file, rank };
	}

	// Function to check if a knight can move from the given position to the target position
	function canKnightMove(from: string, to: string) {
		const fromFileRank = getFileRank(from);
		const toFileRank = getFileRank(to);

		const fileDiff = Math.abs(
			toFileRank.file.charCodeAt(0) - fromFileRank.file.charCodeAt(0)
		);
		const rankDiff = Math.abs(toFileRank.rank - fromFileRank.rank);

		return (
			(fileDiff === 2 && rankDiff === 1) ||
			(rankDiff === 2 && fileDiff === 1)
		);
	}

	return { boardTiles: newBoardState };
}

export default GetChessboardMove;
