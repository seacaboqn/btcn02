import './Square.css';

const Square = ({ isWinning, onClick, value }) => 	{
	return (
		<button className={'square ' + (isWinning ? 'square--winning' : null)} onClick={onClick}>
			{value}
		</button>
	);
}

export default Square;
