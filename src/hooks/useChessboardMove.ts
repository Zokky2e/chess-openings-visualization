import { useState } from "react";
import { ChessBoardTile, startingChessBoardTiles } from "../models/StartingChessBoardTiles";

interface ChessBoardMoveProps {
	currentBoardState: ChessBoardTile[];
	moves: string[];
	currentMove: number;
}

function GetChessboardMove(cmp: ChessBoardMoveProps) {
	let newBoardState: ChessBoardTile[] = cmp.currentBoardState;
	let moves;
	const isBlack = cmp.currentMove % 2 === 1;
	if(cmp.currentMove === -1) {
		newBoardState = startingChessBoardTiles;
	}
	else {
		const currentMove: string = cmp.moves[cmp.currentMove];
		if(currentMove.includes("x")) {
			console.log("jebiga ovo ne radi");
		} else {

			moves = currentMove.split(/(?=[a-z])/);
			if(moves.length === 1) {
				moves.unshift("");
			}
		}
	}
	if(moves) {
		console.log(moves);
		console.log(isBlack);
	}

	return ( {boardTiles: newBoardState});
}

export default GetChessboardMove;