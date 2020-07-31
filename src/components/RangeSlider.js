import React, { useState } from 'react';

const RangeSlider = ( {
	callback = Function,
	initial = 0,
	label = String,
	max = 100,
	min = 0,
	name = String,
} ) => {
	const [value, setValue] = useState(initial);
	const [previous, setPrevious] = useState(value);

	return (
		<>
			<label htmlFor={ name }>{ label }</label>
			<input
				id={ name }
				initial={ initial }
				max={ max }
				min={ min }
				name={ name }
				onMouseDown={ (e) => {
					// Set current value before selection change.
					if ( parseInt( previous ) !== parseInt( e.target.value ) ) {
						setPrevious( parseInt( e.target.value ) );
					}
				} }
				onMouseUp={ (e) => {
					// Check if new value is different from start.
					if ( parseInt( previous ) !== parseInt( e.target.value ) ) {
						setValue( parseInt( e.target.value ) ); // update value state.
						callback( parseInt( e.target.value ) ); // invoke callback.
					}
				} }
				onKeyUp={ (e) => {
					// Set value with keyboard.
					setValue( parseInt( e.target.value ) );
					callback( parseInt( e.target.value ) );
				} }
				type="range"
			/>
		</>
	);
};

export default RangeSlider