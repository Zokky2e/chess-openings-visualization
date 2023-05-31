interface MoveNavigationProps {
	moves: string[];
	currentMove: number;
	updateCurrentMove(value: number): void;
}

function MoveNavigation(moveNavigationProps: MoveNavigationProps) {
	function moveLeft() {
		if (moveNavigationProps.currentMove !== -1) {
			moveNavigationProps.updateCurrentMove(
				moveNavigationProps.currentMove - 1
			);
		}
	}

	function moveRight() {
		if (
			moveNavigationProps.currentMove !==
			moveNavigationProps.moves.length - 1
		) {
			moveNavigationProps.updateCurrentMove(
				moveNavigationProps.currentMove + 1
			);
		}
	}

	return (
		<div className="nav-arrows">
			<button onClick={moveLeft}>❮</button>
			<p>{moveNavigationProps.currentMove + 1}</p>
			<button onClick={moveRight}>❯</button>
		</div>
	);
}

export default MoveNavigation;
