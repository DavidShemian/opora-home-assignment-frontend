import React, { Fragment } from 'react';
import DesktopTable from '../desktop-table';

const CurrentSeasonDriversDesktop = ({ drivers, columnsNames, rowsValuesProperties, onRowClick }) => {
	return (
		<Fragment>
			<DesktopTable columnsNames={columnsNames} rowsValues={drivers} rowsValuesProperties={rowsValuesProperties} onRowClick={onRowClick} />
		</Fragment>
	);
};

export default CurrentSeasonDriversDesktop;
