import * as d3 from "d3";

function ChessBoard() {
	function drawChessBoard() {
		const boardSize = 700;
		const squareSize = boardSize / 8;
		d3.selectAll("svg").remove();
		const board = d3
			.select("#main")
			.append("svg")
			.attr("id", "chess-board")
			.attr("width", boardSize)
			.attr("height", boardSize);

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				board
					.append("rect")
					.attr("x", i * squareSize)
					.attr("y", j * squareSize)
					.attr("width", squareSize)
					.attr("height", squareSize)
					.attr("fill", (i + j) % 2 === 0 ? "#ecdab8" : "#ae8a67");
			}
		}
	}
	drawChessBoard();
	return <div></div>;
}

export default ChessBoard;
