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
			let currentMove: string = cmp.moves[i];
			currentMove = currentMove.replace("+", ""); //TODO fails on forcing line
			if (currentMove.includes("-")) {
				let kingTile: string;
					let rookTile: string;
					let rookStartTile: string;
					const rookName = isBlack ? "r" : "R"
					const kingName = isBlack ? "k" : "K"
					if ((currentMove.split("-").length - 1) === 2) {
						kingTile = "c";
						rookTile = "d";
						rookStartTile = "a"
						if (isBlack) {
							kingTile = kingTile+8;
							rookTile = rookTile+8;
						} else {
							kingTile = kingTile+1;
							rookTile = rookTile+1;
						}
					} else {
						kingTile = "g"
						rookTile = "f"
						rookStartTile = "h"
						if (isBlack) {
							kingTile = kingTile+8;
							rookTile = rookTile+8;
						} else {
							kingTile = kingTile+1;
							rookTile = rookTile+1;
						}
					}
					const kingFromTile = newBoardState.findIndex(
						(tile) => {
							return (
								tile.piece === kingName
							);
						}
					);
					const kingToTile = newBoardState.findIndex(
						(tile) => {
							return tile.id === kingTile;
						}
					);
					newBoardState[kingFromTile].piece = "";
					newBoardState[kingToTile].piece = kingName;
					const rookFromTile = newBoardState.findIndex(
						(tile) => {
							return (
								tile.piece === rookName &&
								tile.id[0] === rookStartTile
							);
						}
					);
					const rookToTile = newBoardState.findIndex(
						(tile) => {
							return tile.id === rookTile;
						}
					);
					newBoardState[rookFromTile].piece = "";
					newBoardState[rookToTile].piece = rookName;
			}
			else {
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
						case "b": {
							let bishop: number;
							if (moves[0].length >= 2) {
								bishop = newBoardState.findIndex((tile) => {
									const legal = 
									(getNumericValueOfColumn(moves[1][0])+parseInt(moves[1][1],10)) % 2
									===
									(getNumericValueOfColumn(tile.id[0])+parseInt(tile.id[1])) % 2
									const piece = isBlack
											? moves[0][0].toLowerCase()
											: moves[0][0];
									return tile.piece === piece && tile.id[0] === moves[0][1] && legal
								});
							} else {
								bishop = newBoardState.findIndex((tile) => {
									const legal = 
									(getNumericValueOfColumn(moves[1][0])+parseInt(moves[1][1],10)) % 2
									===
									(getNumericValueOfColumn(tile.id[0])+parseInt(tile.id[1])) % 2
									const piece = isBlack
											? moves[0][0].toLowerCase()
											: moves[0][0];
									return tile.piece === piece && legal
								});
							}
							const toTile = newBoardState.findIndex((tile) => {
								return tile.id === moves[1];
							});
							newBoardState[bishop].piece = "";
							newBoardState[toTile].piece = moves[0][0];
							if (isBlack) {
								newBoardState[toTile].piece = newBoardState[toTile].piece.toLowerCase();
							}
							break;
						}
						case "k": {
							if (isBlack) moves[0] = moves[0].toLowerCase();
							const fromTile = newBoardState.findIndex(
								(tile) => {
									return (
										tile.piece === moves[0][0]
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
							break;
						}
						case "q": {
							if (isBlack) moves[0] = moves[0].toLowerCase();
							const fromTile = newBoardState.findIndex(
								(tile) => {
									return (
										tile.piece === moves[0][0]
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
							break;
						}
						case "r": {
							if (isBlack) moves[0] = moves[0].toLowerCase();
							const rookTiles: number[] = [];
							newBoardState.forEach(
								(tile, index) => {
									if(tile.piece === moves[0][0])
										rookTiles.push(
											index
										);
								}
							);
							const toTile = newBoardState.findIndex(
								(tile) => {
									return tile.id === moves[1];
								}
							);
							console.log(rookTiles);	
							rookTiles.forEach(rook => {
								if(canRookMove(newBoardState[rook].id, newBoardState[toTile].id)) {
									newBoardState[rook].piece = "";
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
	function canRookMove(from: string, to: string) {
		if (from[0] === to[0]) {
			return true;
		}
		if (from[1] === to[1]) {
			const rookRow = newBoardState.filter(tiles => 
				tiles.id.includes(to[1])
			);
			let rookIndex = 0;
			let targetIndex = 0;
			rookRow.forEach((item, index) => {
				if(item.id === from)
					rookIndex = index;
				if(item.id === to) 
					targetIndex = index;
			})
			let canMove = true;
			rookRow.splice(Math.min(rookIndex, targetIndex), Math.max(rookIndex, targetIndex)).forEach((item)=>{
				if(item.id !== from) {
					if(item.piece !== "") {
						canMove = false;
					}
				}
			});
			
			return canMove;
		}
		return false;
	}

	function getNumericValueOfColumn(char: string) {
		const charCode = char.charCodeAt(0);
		const numericValue = charCode - "a".charCodeAt(0) + 1;
		return numericValue;
	}

	function getFileRank(position: string) {
		const file = position.charAt(0);
		const rank = parseInt(position.charAt(1), 10);
		return { file, rank };
	}

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
