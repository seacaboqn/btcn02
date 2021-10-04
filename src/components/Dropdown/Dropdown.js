import React from 'react';
import './Dropdown.css';

const Dropdown = ({ onFetchData }) => {
	const onChange = (event) => {
		onFetchData(event.target.value);
	};
	return (
		<div className="dropdown">
			<p>Choose board size:</p>
			<select className="board-size" onChange={onChange}>
				<option value="5">5x5</option>
				<option value="6">6x6</option>
				<option value="7">7x7</option>
				<option value="8">8x8</option>
				<option value="9">9x9</option>
				<option value="10">10x10</option>
				<option value="11">11x11</option>
				<option value="12">12x12</option>
				<option value="13">13x13</option>
				<option value="14">14x14</option>
				<option value="15">15x15</option>
				<option value="16">16x16</option>
				<option value="17">17x17</option>
				<option value="18">18x18</option>
				<option value="19">19x19</option>
				<option value="20">20x20</option>
			</select>
		</div>
	);
};

export default Dropdown;
