import React, { Fragment } from 'react';
import DesktopTable from '../desktop-table';

const DriverRacesDesktop = ({ driverRaces, columnsNames, rowsValuesProperties }) => {
	return (
		<Fragment>
			<DesktopTable columnsNames={columnsNames} rowsValues={driverRaces} rowsValuesProperties={rowsValuesProperties} />
		</Fragment>
	);
};

export default DriverRacesDesktop;
