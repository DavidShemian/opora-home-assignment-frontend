import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Loader from 'react-spinners/ClipLoader';

const DriversTable = () => {
	const [drivers, setDrivers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await axios('http://localhost:6500/drivers/current-season');

				setDrivers(result.data);
			} catch (e) {
				console.error(e);
			}
		}

		fetchData();
	}, []);

	const renderDrivesTable = () => {
		const tableHead = getTableHead();
		const tableBody = getTableBody();

		return (
			<Table>
				{tableHead}
				{tableBody}
			</Table>
		);
	};

	const getTableHead = () => {
		const columns = ['avatar', 'name', 'nationality', 'position', 'points'];

		const tableHeadContent = columns.map((key, index) => {
			return <th key={index}>{key}</th>;
		});

		return (
			<thead>
				<tr>{tableHeadContent}</tr>
			</thead>
		);
	};

	const getTableBody = () => {
		const tableBodyContent = drivers.map(({ driverId, forename, surname, nationality, position, points }) => {
			return (
				<tr key={driverId}>
					<td>avatar</td>
					<td>{`${forename} ${surname}`}</td>
					<td>{nationality}</td>
					<td>{position}</td>
					<td>{points}</td>
				</tr>
			);
		});

		return <tbody>{tableBodyContent}</tbody>;
	};

	const currentSeason = new Date().getFullYear();

	return (
		<Container>
			<h1>Drivers</h1>
			<h5>{currentSeason} drivers sorted by wins</h5>
			{drivers.length > 0 ? renderDrivesTable() : <Loader />}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Table = styled.table`
	width: 90%;
	min-width: 300px;
	margin: 20px auto;
	padding: 20px;
	border-collapse: collapse;
	background-color: white;

	thead {
		background-color: #f5f7f9;
	}

	th {
		text-align: center;
		padding: 5px;
	}

	tr:hover {
		background-color: #f5f7f9;
	}

	td {
		padding: 10px;
	}

	td,
	th {
		border: 0.5px solid #2125292b;
	}
`;

export default DriversTable;
