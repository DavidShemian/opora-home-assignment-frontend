import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ComponentContainer from '../component-container/component-container';
import Loader from '../loader/loader';
import DriversTableDesktop from './drivers-table-desktop';
import DriversTableMobile from './drivers-table-mobile';
import useIsMobile from '../use-is-mobile/use-is-mobile';
import { getFullEndPoint } from '../../common/request';

const DriversTable = () => {
	const [drivers, setDrivers] = useState([]);
	const columns = ['avatar', 'name', 'nationality', 'position', 'points'];
	const isMobile = useIsMobile();

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await axios(getFullEndPoint('/drivers/current-season'));

				setDrivers(result.data);
			} catch (e) {
				console.error(e);
			}
		}

		fetchData();
	}, []);

	const isDataLoaded = () => drivers.length > 0;

	const currentSeason = new Date().getFullYear();

	const CenteredLoader = () => {
		return (
			<CenteredLoaderContainer>
				<Loader />
			</CenteredLoaderContainer>
		);
	};

	const renderTable = () => {
		return isDataLoaded() ? (
			isMobile ? (
				<DriversTableMobile drivers={drivers} columns={columns} />
			) : (
				<DriversTableDesktop drivers={drivers} columns={columns} />
			)
		) : (
			<CenteredLoader />
		);
	};

	return (
		<Container>
			<h1>Drivers</h1>
			<h5>{currentSeason} drivers sorted by wins</h5>
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

const CenteredLoaderContainer = styled.div`
	position: absolute;
	top: 30%;
`;

export default DriversTable;
