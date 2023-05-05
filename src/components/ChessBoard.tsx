import * as d3 from "d3";
import { ChessOpening } from "../models/ChessOpening";
import { startingChessBoardTiles } from "../models/StartingChessBoardTiles";
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
			.attr("height", boardSize);
		const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
		const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				board
					.append("rect")
					.attr("id", () => {
						return `${columns[i]}${rows[j]}`;
					})
					.attr("piece", () => {
						const piece = startingChessBoardTiles.find(
							(tile) => tile.id === `${columns[i]}${rows[j]}`
						)?.piece;
						return piece ? piece : "";
					})
					.attr("x", i * squareSize)
					.attr("y", j * squareSize)
					.attr("width", squareSize)
					.attr("height", squareSize)
					.attr("fill", (i + j) % 2 === 0 ? "#ecdab8" : "#ae8a67");
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
		d: d3.Selection<
			SVGSVGElement,
			{ id: string; piece: string },
			HTMLElement,
			any
		>
	) {
		const pawnGroup = d.append("g");

		// create the pawn shape as a circle
		pawnGroup
			.append("circle")
			.attr("r", 10)
			.attr("fill", "white")
			.attr("stroke", "black")
			.attr("stroke-width", 2);

		// position the pawn on the board
		pawnGroup
			.attr("transform", `translate(100, 400)`)
			.style("z-index", 1000);
	}

	function drawChessPieces() {
		const pieces = d3
			.selectAll<SVGSVGElement, { id: string; piece: string }>(
				"rect[piece]"
			)
			.append("svg")
			.attr("id", "chess-piece")
			.attr("width", squareSize)
			.attr("height", squareSize)
			.call(function (
				this: d3.Selection<
					SVGSVGElement,
					{ id: string; piece: string },
					HTMLElement,
					any
				>,
				selection
			) {
				selection.each(function (d) {
					let piece = "";
					if (!d3.select(this).attr("piece")) {
						piece = "";
					} else {
						piece = d3.select(this).attr("piece").toLowerCase();
					}
					switch (piece) {
						case "p": {
							drawPawn(this);
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
				});
			});
	}
	drawChessBoard();
	drawChessPieces();
	return <div></div>;
}

export default ChessBoard;
