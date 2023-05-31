import { useState } from "react";
import { ChessBoardTile, startingChessBoardTiles } from "../models/StartingChessBoardTiles";

interface ChessBoardMoveProps {
	currentBoardState: ChessBoardTile[];
	moves: string[];
	currentMove: number;
}

function GetChessboardMove(cmp: ChessBoardMoveProps) {
	let newBoardState: ChessBoardTile[] = JSON.parse(JSON.stringify(startingChessBoardTiles));
	let moves: string[] = [];
	let isBlack = false;
	if(cmp.currentMove === -1) {
		newBoardState = JSON.parse(JSON.stringify(startingChessBoardTiles));
	}
	else {
		for(let i=0; i<=cmp.currentMove;i++) {
			isBlack = i % 2 === 1;
			const currentMove: string = cmp.moves[i];
		if(currentMove.includes("-")) {
			console.log(currentMove);
		} else {
			moves = currentMove.split(/(?=[a-z])/);
			if(moves.length === 1) {
				moves.unshift("");
			}
			if(moves[0] === "")
					moves[0] = "P";
				if(isBlack)
					moves[0] = moves[0].toLowerCase();
			if(moves.length === 2) {
				switch(moves[0].toLowerCase()) {
					case "p": {
						const fromTile = newBoardState.findIndex(tile => {
							return tile.id[0] === moves[1][0] && tile.piece === moves[0]
						})
						const toTile = newBoardState.findIndex(tile => {
							return tile.id === moves[1];
						})
						newBoardState[fromTile].piece = "";
						newBoardState[toTile].piece = moves[0];
						break;
					}
				}
			}
		}
	}
}
	if(moves.length > 0) {
		console.log(moves);
		console.log(isBlack);
		console.log(newBoardState);
	}

	return ( {boardTiles: newBoardState});
}

export default GetChessboardMove;