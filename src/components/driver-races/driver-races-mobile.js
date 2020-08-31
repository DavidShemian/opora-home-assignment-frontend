import React from 'react';
import MobileCardList from '../mobile-table';

const DriverRacesMobile = ({ driverRaces, cardTitles, rowsValuesProperties }) => {
	return <MobileCardList cardsValues={driverRaces} cardTitles={cardTitles} rowsValuesProperties={rowsValuesProperties} />;
};

export default DriverRacesMobile;
