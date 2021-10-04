import React, { useState } from 'react';
import Board from '../Board/Board';
import Dropdown from '../Dropdown/Dropdown';
import './Game.css';

function calculateWinner(squares, n) {
	for (let i = 0; i < squares.length; i++) {
		const x = i % n; // x là vị trí hàng
		const y = Math.floor(i / n); // y là vị trí cột

		// xét hàng
		if (x + 5 <= n) {
			if (
				squares[i] &&
				squares[i] === squares[i + 1] &&
				squares[i] === squares[i + 2] &&
				squares[i] === squares[i + 3] &&
				squares[i] === squares[i + 4]
			) {
				return { player: squares[i], line: [i, i + 1, i + 2, i + 3, i + 4] };
			}
		}

		// xét cột
		if (y + 5 <= n) {
			if (
				squares[i] &&
				squares[i] === squares[i + n] &&
				squares[i] === squares[i + 2 * n] &&
				squares[i] === squares[i + 3 * n] &&
				squares[i] === squares[i + 4 * n]
			) {
				return { player: squares[i], line: [i, i + n, i + 2 * n, i + 3 * n, i + 4 * n] };
			}
		}

		// Xét đường chéo chính
		if (x + 5 <= n) {
			if (
				squares[i] &&
				squares[i] === squares[i + (n + 1)] &&
				squares[i] === squares[i + 2 * (n + 1)] &&
				squares[i] === squares[i + 3 * (n + 1)] &&
				squares[i] === squares[i + 4 * (n + 1)]
			) {
				return {
					player: squares[i],
					line: [i, i + (n + 1), i + 2 * (n + 1), i + 3 * (n + 1), i + 4 * (n + 1)],
				};
			}
		}

		// Xét chéo phụ
		if (x - 5 >= -1) {
			if (
				squares[i] &&
				squares[i] === squares[i + (n - 1)] &&
				squares[i] === squares[i + 2 * (n - 1)] &&
				squares[i] === squares[i + 3 * (n - 1)] &&
				squares[i] === squares[i + 4 * (n - 1)]
			) {
				return {
					player: squares[i],
					line: [i, i + (n - 1), i + 2 * (n - 1), i + 3 * (n - 1), i + 4 * (n - 1)],
				};
			}
		}
	}

	return null;
}

const Game = () => {
	const [history, setHistory] = useState([
		{
			squares: Array(25).fill(null),
		},
	]);
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);
	const [isDescending, setIsDescending] = useState(true);
	const [boardSize, setBoardSize] = useState(5);

	function handleClick(i) {
		const currentHistory = history.slice(0, stepNumber + 1);
		const current = currentHistory[currentHistory.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares, boardSize) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? 'X' : 'O';
		setHistory(
			currentHistory.concat([
				{
					squares: squares,
					location: [i % boardSize, Math.floor(i / boardSize)],
				},
			])
		);
		setStepNumber(currentHistory.length);
		setXIsNext(!xIsNext);
	}

	function jumpTo(step) {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
	}

	function sortHistory() {
		setIsDescending(!isDescending);
	}

	const changeBoardSize = (data) => {
		setHistory([
			{
				squares: Array(data * data).fill(null),
			},
		]);
		setStepNumber(0);
		setXIsNext(true);
		setIsDescending(true);
		setBoardSize(parseInt(data));
	};

	const current = history[stepNumber];
	const winner = calculateWinner(current.squares, boardSize);

	const moves = history.map((step, move) => {
		const desc = move
			? 'Go to move #' + move + ' at location (' + history[move].location + ')'
			: 'Go to game start';
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>
					{move === stepNumber ? <b>{desc}</b> : desc}
				</button>
			</li>
		);
	});

	let status;
	if (winner) {
		status = 'Winner: ' + winner.player + ' at points ' + winner.line;
	} else if (!current.squares.includes(null)) {
		status = 'Draw';
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board
					squares={current.squares}
					onClick={(i) => handleClick(i)}
					winningSquares={winner ? winner.line : []}
					boardSize={boardSize}
				/>
			</div>
			<div className="game-info">
				<div>{status}</div>
				<ol>{isDescending ? moves : moves.reverse()}</ol>
				<button
					onClick={() => {
						sortHistory();
					}}
				>
					Sort by: {isDescending ? 'Descending' : 'Asending'}
				</button>
			</div>
			<Dropdown onFetchData={changeBoardSize} />
		</div>
	);
};

export default Game;
