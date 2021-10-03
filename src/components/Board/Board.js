import React from 'react';
import Square from '../Square/Square';
import './Board.css';

const boardSize = 6;

function Board({ squares, winningSquares, onClick }) {
	let createSquares = [];
	for (let i = 0; i < boardSize; ++i) {
		let row = [];
		for (let j = 0; j < boardSize; ++j) {
			row.push(
				renderSquare(
					squares[i * boardSize + j],
					i * boardSize + j,
					winningSquares.includes(i * boardSize + j),
					onClick
				)
			);
		}
		createSquares.push(
			<div key={i} className="board-row">
				{row}
			</div>
		);
	}

	return <div>{createSquares}</div>;
}

function renderSquare(value, i, isWinSquare, onClick) {
	return (
		<Square
			value={value}
			onClick={() => onClick(i)}
			isWinning={isWinSquare}
			key={'square' + i}
		/>
	);
}

export default Board;
