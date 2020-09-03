import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ComponentContainer from '../components/component-container';
import useIsMobile from '../hooks/use-is-mobile';
import { getFullEndPoint } from '../services/http';
import CenteredSpinner from '../components/centered-spinner';
import CurrentSeasonDriversMobile from '../components/current-season-drivers/current-season-drivers-mobile';
import CurrentSeasonDriversDesktop from '../components/current-season-drivers/current-season-drivers-desktop';
import { useHistory } from 'react-router-dom';
import PageTitle from '../components/page-title';

const CurrentSeasonDriversPage = () => {
	const rowsValuesProperties = ['name', 'position', 'nationality', 'points', 'wins'];
	const rowsValuesPropertiesDesktop = ['avatar', ...rowsValuesProperties]; // Adds avatar to desktop table
	const columnsNames = [...rowsValuesProperties];
	const columnsNamesDesktop = [...rowsValuesPropertiesDesktop];

	const [drivers, setDrivers] = useState([]);
	const isMobile = useIsMobile();
	const history = useHistory();

	const setDriversToDisplay = (drivers) => {
		const driversWithImgAsAvatar = drivers.map((driver) => {
			return {
				...driver,
				avatar: <img src={driver.avatar} alt='avatar' />,
			};
		});

		setDrivers(driversWithImgAsAvatar);
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await axios(getFullEndPoint('/drivers/current-season'));

				setDriversToDisplay(result.data.drivers);
			} catch (e) {
				console.error(e);
			}
		}

		fetchData();
	}, []);

	const isDataLoaded = () => drivers.length > 0;

	const currentSeason = new Date().getFullYear();

	const onDriverClick = (index) => {
		const { driverId, name } = drivers[index];
		history.push({ pathname: `/driver/${driverId}/races`, state: { driverName: name } });
	};

	const renderTable = () => {
		return isDataLoaded() ? (
			isMobile ? (
				<CurrentSeasonDriversMobile
					drivers={drivers}
					columnsNames={columnsNames}
					rowsValuesProperties={rowsValuesProperties}
					onCardClick={onDriverClick}
				/>
			) : (
				<CurrentSeasonDriversDesktop
					drivers={drivers}
					columnsNames={columnsNamesDesktop}
					rowsValuesProperties={rowsValuesPropertiesDesktop}
					onRowClick={onDriverClick}
				/>
			)
		) : (
			<CenteredSpinner />
		);
	};

	return (
		<Container>
			<PageTitle>
				<h1>Drivers</h1>
				<h5>{currentSeason} drivers sorted by wins</h5>
			</PageTitle>
			{renderTable()}
		</Container>
	);
};

const Container = styled(ComponentContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default CurrentSeasonDriversPage;
