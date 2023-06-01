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
				moves.unshift("P");
			}
			console.log(moves);
			moves = moves.filter(move => move !== "x");
			console.log(moves);
			if(moves[0] === moves[0].toLowerCase()) {
				moves[0] = "P"+moves[0];
			}
			console.log(moves);
			if(moves.length === 2) {
				switch(moves[0][0].toLowerCase()) {
					case "p": {
						if(moves[0].length === 1) {
							moves[0] = moves[0]+moves[1][0];
						}
						if(isBlack)
							moves[0] = moves[0].toLowerCase();
						console.log(moves);
						if(moves[1][0] !== moves[0][1]) {
							const fromTile = newBoardState.findIndex(tile => {
								return tile.id[0] === moves[0][1] && tile.piece === moves[0][0];
							});
							const toTile = newBoardState.findIndex(tile => {
								return tile.id === moves[1];
							});
							newBoardState[fromTile].piece = "";
							newBoardState[toTile].piece = moves[0][0];
						}
						else {
							const fromTile = newBoardState.findIndex(tile => {
								return tile.id[0] === moves[1][0] && tile.piece === moves[0][0];
							});
							const toTile = newBoardState.findIndex(tile => {
								return tile.id === moves[1];
							});
							newBoardState[fromTile].piece = "";
							newBoardState[toTile].piece = moves[0][0];
						}
						break;
					}
				}
			}
		}
	}
}
	

	return ( {boardTiles: newBoardState});
}

export default GetChessboardMove;