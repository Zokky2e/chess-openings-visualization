import * as d3 from "d3";
import { ChessOpening } from "../models/ChessOpening";
import { useEffect, useState } from "react";
interface ChessBoardProps {
	chessOpening: ChessOpening;
}
interface WinRate {
	percent: number;
	person: string;
}

function BarGraph(chessBoardProps: ChessBoardProps) {
	return <div></div>;
}

export default BarGraph;
