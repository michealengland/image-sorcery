import React, { useState } from 'react';

/**
 * Range Slider Input
 *
 * Perform onChange once value has been inputs have been deselected.
 *
 * @param {*}
 */
const RangeSlider = ( { initial = 0, label, name, min = 0, max = 100, callback } ) => {
	const [value, setValue] = useState(initial);
	const [previous, setPrevious] = useState(value);

	return <>
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
					console.log('previous value updated.');
				}
			} }
			onMouseUp={ (e) => {
				// Check if new value is different from start.
				if ( parseInt( previous ) !== parseInt( e.target.value ) ) {
					console.log('execute callback.');
					callback( parseInt( e.target.value ) );
				}
			} }
			onChange={ (e) => {
				// Set value state.
				setValue( parseInt( e.target.value ) );
			} }
			type="range"
		/>
	</>;
};

export default RangeSlider