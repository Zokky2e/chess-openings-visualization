/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from "d3";
import { ChessOpening } from "../models/ChessOpening";
import { startingChessBoardTiles } from "../models/StartingChessBoardTiles";
import { useEffect } from "react";
interface ChessBoardProps {
	chessOpening: ChessOpening;
}

function ChessBoard(chessBoardProps: ChessBoardProps) {
	const boardSize = 700;
	const squareSize = boardSize / 8;
	function drawChessBoard() {
		d3.selectAll("svg").remove();
		const board = d3
			.select("#main")
			.append("svg")
			.attr("id", "chess-board")
			.attr("width", boardSize)
			.attr("height", boardSize)
			.attr("viewBox", `0 0 ${boardSize} ${boardSize}`);
		const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const parentX = i * squareSize;
				const parentY = j * squareSize;
				let piece = startingChessBoardTiles.find(
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
						drawPawn(id, piece, parentX, parentY);
						break;
					}
					case "n": {
						break;
					}
					case "r": {
						break;
					}
					case "b": {
						break;
					}
					case "q": {
						break;
					}
					case "k": {
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

	function drawPawn(
		id: string,
		piece: string,
		parentX: number,
		parentY: number
	) {
		const pawnX = parentX + 20;
		const pawnY = parentY + 50;
		const pawnWidth = 50;
		const pawnHeight = 30;
		const svg = d3
			.select("#chess-board")
			.insert("g", ":first-child")
			.attr("id", `${piece}${id}`)
			.attr("width", "150px")
			.attr("height", "150px");

		const pawnBody = svg
			.append("rect")
			.attr("x", pawnX)
			.attr("y", pawnY)
			.attr("id", `body-${piece}${id}`)
			.attr("width", pawnWidth - 10)
			.attr("height", pawnHeight - 20)
			.attr("rx", 5)
			.style("fill", piece === "P" ? "white" : "black");

		const pawnHead = svg
			.append("rect")
			.attr("x", pawnX + 5)
			.attr("y", pawnY - 10)
			.attr("id", `head-${piece}${id}`)
			.attr("width", pawnWidth - 30)
			.attr("height", pawnHeight - 20)
			.style("fill", piece === "P" ? "white" : "black");

		const pawnTop = svg
			.append("rect")
			.attr("x", pawnX + 10)
			.attr("y", pawnY - 20)
			.attr("id", `top-${piece}${id}`)
			.attr("width", pawnWidth - 20)
			.attr("height", pawnHeight - 20)
			.style("fill", piece === "P" ? "white" : "black");
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
