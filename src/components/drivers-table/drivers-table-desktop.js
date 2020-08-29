import React from 'react';
import styled from 'styled-components';

const DriversTableDesktop = ({ drivers }) => {
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

	return renderDrivesTable();
};

const Table = styled.table`
	width: 90%;
	min-width: 300px;
	margin: 20px auto;
	padding: 20px;
	border-collapse: collapse;
	background-color: ${(props) => props.theme.colors.white};

	thead {
		background-color: ${(props) => props.theme.colors.offWhite};
	}

	th {
		text-align: center;
		padding: 5px;
	}

	tr:hover {
		background-color: ${(props) => props.theme.colors.offWhite};
	}

	td {
		padding: 10px;
	}

	td,
	th {
		border: 0.5px solid;
		border-color: ${(props) => props.theme.colors.lightGrey};
	}
`;

export default DriversTableDesktop;
