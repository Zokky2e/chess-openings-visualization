/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from "d3";
import { ChessOpening } from "../models/ChessOpening";
import {
	ChessBoardTile,
	startingChessBoardTiles,
} from "../models/StartingChessBoardTiles";
import { useEffect } from "react";
import MoveNavigation from "./MoveNavigation";

interface ChessBoardProps {
	chessOpening: ChessOpening;
	chessBoardTiles: ChessBoardTile[];
}

function ChessBoard(chessBoardProps: ChessBoardProps) {
	const boardSize = 800;
	const squareSize = boardSize / 8;
	function drawChessBoard() {
		d3.selectAll("svg").remove();
		const board = d3
			.select("#chessboard-container")
			.append("svg")
			.attr("id", "chess-board")
			.attr("width", boardSize)
			.attr("height", boardSize)
			.attr("viewBox", `0 0 ${boardSize} ${boardSize}`);
		const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const parentX = j * squareSize;
				const parentY = i * squareSize;
				let piece = chessBoardProps.chessBoardTiles.find(
					(tile) => tile.id === `${columns[i]}${rows[j]}`
				)?.piece;
				const id = `${columns[i]}${rows[j]}`;
				board
					.append("rect")
					.attr("id", () => {
						return id;
					})
					.attr("piece", () => {
						return piece ? piece : "";
					})
					.attr("x", i * squareSize)
					.attr("y", j * squareSize)
					.attr("width", squareSize)
					.attr("height", squareSize)
					.attr("fill", (i + j) % 2 === 0 ? "#ecdab8" : "#ae8a67");
				if (!piece) {
					piece = "";
				}
				switch (piece.toLowerCase()) {
					case "p": {
						drawPiece(
							board,
							id,
							piece === "P" ? "\u2659" : "\u265F",
							parentX,
							parentY
						);
						break;
					}
					case "n": {
						drawPiece(
							board,
							id,
							piece === "N" ? "\u2658" : "\u265E",
							parentX,
							parentY
						);
						break;
					}
					case "r": {
						drawPiece(
							board,
							id,
							piece === "R" ? "\u2656" : "\u265C",
							parentX,
							parentY
						);
						break;
					}
					case "b": {
						drawPiece(
							board,
							id,
							piece === "B" ? "\u2657" : "\u265D",
							parentX,
							parentY
						);
						break;
					}
					case "q": {
						drawPiece(
							board,
							id,
							piece === "Q" ? "\u2655" : "\u265B",
							parentX,
							parentY
						);
						break;
					}
					case "k": {
						drawPiece(
							board,
							id,
							piece === "K" ? "\u2654" : "\u265A",
							parentX,
							parentY
						);
						break;
					}
					default: {
						break;
					}
				}
				if (j === 7) {
					board
						.append("text")
						.text(columns[i])
						.attr("x", i * squareSize + squareSize * 0.8)
						.attr("y", j * squareSize + squareSize * 0.9)
						.attr(
							"fill",
							(i + j) % 2 !== 0 ? "#ecdab8" : "#ae8a67"
						);
				}
				if (i === 0) {
					board
						.append("text")
						.text(rows[j])
						.attr("x", i * squareSize + squareSize * 0.1)
						.attr("y", j * squareSize + squareSize * 0.2)
						.attr(
							"fill",
							(i + j) % 2 !== 0 ? "#ecdab8" : "#ae8a67"
						);
				}
			}
		}
	}

	function drawPiece(
		board: any,
		id: string,
		piece: string,
		parentX: number,
		parentY: number
	) {
		const pawnX = parentX + 55;
		const pawnY = parentY - 50;
		const pawnWidth = 50;
		const pawnHeight = 30;
		const pieceG = board.append("g");
		pieceG
			.append("text")
			.attr("id", `${piece}${id}`)
			.attr("x", pawnWidth)
			.attr("y", pawnHeight)
			.text(piece)
			.attr("dy", pawnX)
			.attr("dx", pawnY)
			.style("font-size", squareSize)
			.style("background-color", piece === "P" ? "white" : "black");
	}

	useEffect(() => {
		drawChessBoard();
	}, []);
	return <div></div>;
}

export default ChessBoard;

// switch (d.parent) {
// 	case "p": {
// 		console.log(d.id);
// 		drawPawn();
// 		break;
// 	}
// 	case "n": {
// 		break;
// 	}
// 	case "r": {
// 		break;
// 	}
// 	case "b": {
// 		break;
// 	}
// 	case "q": {
// 		break;
// 	}
// 	case "k": {
// 		break;
// 	}
// 	default: {
// 		break;
// 	}
// }
