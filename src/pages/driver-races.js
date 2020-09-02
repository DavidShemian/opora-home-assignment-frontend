import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ComponentContainer from '../components/component-container';
import useIsMobile from '../hooks/use-is-mobile';
import { getFullEndPoint } from '../services/http';
import DriverRacesDesktop from '../components/driver-races/driver-races-desktop';
import DriverRacesMobile from '../components/driver-races/driver-races-mobile';
import CenteredSpinner from '../components/centered-spinner';
import { useParams, useHistory } from 'react-router-dom';
import CleanButton from '../components/clean-button';
import PageTitle from '../components/page-title';

const DriverRacesPage = () => {
	const columnsNames = [
		'Average Lap Time',
		'Fastest Lap Time',
		'Slowest Lap Time',
		'Number Of Pit Stops',
		'Fastest Pit Stop',
		'Slowest Pit Stop',
		'Circuit name',
		'Points',
		'Position',
	];

	const rowsValuesProperties = [
		'averageLapTime',
		'fastestLapTime',
		'slowestLapTime',
		'numOfPitStops',
		'fastestPitStop',
		'slowestPitStop',
		'circuitName',
		'points',
		'position',
	];

	const [driverRaces, setDriverRaces] = useState([]);
	const [driverName, setDriverName] = useState('');

	const { driverId } = useParams();
	const isMobile = useIsMobile();
	const history = useHistory();

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await axios(getFullEndPoint(`/drivers/${driverId}/races`));

				if (!result || result.data.length === 0) {
					history.push('/');
					return;
				}

				const { driverName } = history.location.state;
				setDriverName(driverName);
				setDriverRaces(result.data);
			} catch (e) {
				history.push('/');
				alert('Unable to fetch data');
				console.error(e);
			}
		}

		fetchData();
	}, [driverId, history]);

	const isDataLoaded = () => driverRaces.length > 0;

	const redirectToDriversTable = () => {
		history.push('/');
	};

	const renderTable = () => {
		return isDataLoaded() ? (
			isMobile ? (
				<DriverRacesMobile driverRaces={driverRaces} cardTitles={columnsNames} rowsValuesProperties={rowsValuesProperties} />
			) : (
				<DriverRacesDesktop driverRaces={driverRaces} columnsNames={columnsNames} rowsValuesProperties={rowsValuesProperties} />
			)
		) : (
			<CenteredSpinner />
		);
	};

	return (
		<Container>
			<PageTitle>
				<h1>Races</h1>
				<h5>{`${driverName} races`}</h5>
				<CleanButton onClick={redirectToDriversTable}>drivers table</CleanButton>
			</PageTitle>
			{renderTable()}
		</Container>
	);
};

const Container = styled(ComponentContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 500px;
	position: relative;
`;

export default DriverRacesPage;
