import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CleanButton from './clean-button';

const DesktopTable = ({ columnsNames, rowsValues, rowsValuesProperties, onRowClick }) => {
	const DEFAULT_CURRENT_PAGE = 0;
	const DEFAULT_NUMBER_ROWS_PER_PAGE = 10;
	const ALL_ROWS_PER_PAGE = -1;

	const [page, setPage] = useState(DEFAULT_CURRENT_PAGE);
	const [wasPageChanged, setWasPageChanged] = useState(false);
	const [wasNumOfRowsPerPageChange, setWasNumOfRowsPerPageChange] = useState(false);
	const [numOfRowsPerPage, setNumOfRowsPerPage] = useState(DEFAULT_NUMBER_ROWS_PER_PAGE);
	const [numberOfPages, setNumberOfPages] = useState();
	const [tableHead, setTableHead] = useState([]);
	const [tableBody, setTableBody] = useState([]);
	const [tableBodyPerPage, setTableBodyPerPage] = useState([]);
	const [allTableRows, setAllTableRows] = useState([]);

	const getTableHead = useCallback(() => {
		const tableColumns = columnsNames.map((key, index) => {
			return <th key={index}>{key}</th>;
		});

		tableColumns.unshift(<th key={'index'}>#</th>); // Adds row number column to each table
		return (
			<thead>
				<tr>{tableColumns}</tr>
			</thead>
		);
	}, [columnsNames]);

	const getTableBodyRows = useCallback(() => {
		return rowsValues.map((value, index) => {
			const tableDataCells = rowsValuesProperties.map((valueProperty, index) => <td key={index}>{value[valueProperty]}</td>);
			return (
				<tr key={index} onClick={() => (onRowClick ? onRowClick(index) : '')}>
					<td key={'row-number'}>{index + 1}</td>
					{tableDataCells}
				</tr>
			);
		});
	}, [rowsValues, rowsValuesProperties, onRowClick]);

	const getTableBody = useCallback((tableBodyRows) => {
		return <tbody>{tableBodyRows}</tbody>;
	}, []);

	const setTableBodyRowsAccordingToPage = useCallback(() => {
		if (allTableRows.length > 0) {
			if (numOfRowsPerPage === ALL_ROWS_PER_PAGE) {
				setTableBodyPerPage(getTableBody(allTableRows));

				return;
			}

			const base = page * numOfRowsPerPage;
			const rowsSlice = allTableRows.slice(base, base + numOfRowsPerPage);

			setTableBodyPerPage(getTableBody(rowsSlice));
		}
	}, [allTableRows, numOfRowsPerPage, page, getTableBody, ALL_ROWS_PER_PAGE]);

	const updateNumberOfPages = useCallback(() => {
		const isSinglePage = numOfRowsPerPage === ALL_ROWS_PER_PAGE || numOfRowsPerPage > allTableRows.length;
		const numOfPages = isSinglePage ? 1 : Math.ceil(rowsValues.length / numOfRowsPerPage);
		setNumberOfPages(numOfPages);
	}, [numOfRowsPerPage, rowsValues, allTableRows, ALL_ROWS_PER_PAGE]);

	const onPageNumberChange = ({ target }) => {
		changePage(target.value);
	};

	const changePage = (pageNumber) => {
		setWasPageChanged(true);
		setPage(+pageNumber);
	};

	const isFirstPage = () => {
		return page === 0;
	};

	const isLastPage = () => {
		return page === numberOfPages - 1;
	};

	const changeNumberOfRowsPerPage = ({ target }) => {
		setNumOfRowsPerPage(+target.value);
		setPage(0);
		setWasNumOfRowsPerPageChange(true);
	};

	const SelectNumberOfRowsPerPage = () => {
		const options = [10, 20, 30, 40, 50, 60, 70, 80, 90].map((value) => (
			<option key={value} value={value}>
				{value}
			</option>
		));

		// Add all rows per page option
		options.push(
			<option key={ALL_ROWS_PER_PAGE} value={ALL_ROWS_PER_PAGE}>
				{'all'}
			</option>
		);

		return (
			<select value={numOfRowsPerPage} onChange={changeNumberOfRowsPerPage}>
				{options}
			</select>
		);
	};

	useEffect(() => {
		if (tableHead.length === 0) {
			setTableHead(getTableHead());
		}

		if (tableBody.length === 0) {
			const tableBodyRows = getTableBodyRows();
			setAllTableRows(tableBodyRows);
			const tableBody = getTableBody(tableBodyRows);
			setTableBody(tableBody);
		}

		if (tableBodyPerPage.length === 0) {
			setTableBodyRowsAccordingToPage();
		}

		if (!numberOfPages && allTableRows.length > 0) {
			updateNumberOfPages();
		}

		if (wasPageChanged || wasNumOfRowsPerPageChange) {
			setTableBodyRowsAccordingToPage();
			updateNumberOfPages();
			setWasPageChanged(false);
			setWasNumOfRowsPerPageChange(false);
		}
	}, [
		tableHead,
		tableBody,
		getTableHead,
		getTableBody,
		setTableBodyRowsAccordingToPage,
		getTableBodyRows,
		tableBodyPerPage,
		page,
		setWasPageChanged,
		wasPageChanged,
		numberOfPages,
		updateNumberOfPages,
		numOfRowsPerPage,
		rowsValues,
		wasNumOfRowsPerPageChange,
		allTableRows,
	]);

	return (
		<Container>
			<TableContainer>
				<Table>
					{tableHead}
					{tableBodyPerPage}
				</Table>
			</TableContainer>
			<PageContainer>
				<InlineContainer>
					<ChangePageButton disabled={isFirstPage()} onClick={() => changePage(page - 1)}>
						{'<'}
					</ChangePageButton>
					<input type='number' min='1' value={page + 1} onChange={onPageNumberChange} /> <label> / {numberOfPages} </label>
					<ChangePageButton disabled={isLastPage()} onClick={() => changePage(page + 1)}>
						{'>'}
					</ChangePageButton>
				</InlineContainer>
				<div></div>
			</PageContainer>
			<NumberOfRowsContainer>
				<label># of rows per page</label>
				<SelectNumberOfRowsPerPage />
			</NumberOfRowsContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: auto;
	width: 100%;
`;

const TableContainer = styled.div`
	overflow-x: auto;
`;

const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;
	padding: 20px;

	input {
		margin-right: 10px;
		height: 20px;
		width: 40px;
	}
`;

const Table = styled.table`
	width: 90%;
	font-size: 12px;
	margin: auto;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.colors.white};
	thead {
		background-color: ${({ theme }) => theme.colors.offWhite};
		text-transform: capitalize;
	}

	tbody {
		tr {
			:hover {
				cursor: pointer;
			}
		}
		td {
			img {
				width: 50px;
				height: 50px;
			}
		}
	}

	th {
		text-align: center;
		padding: 5px;
	}

	tr:hover {
		background-color: ${({ theme }) => theme.colors.lightGrey};
	}

	td {
		padding: 10px;
	}

	td,
	th {
		border: 0.5px solid;
		border-color: ${({ theme }) => theme.colors.lightGrey};
	}
`;

const InlineContainer = styled.div`
	display: flex;
	align-items: center;
`;

const NumberOfRowsContainer = styled(InlineContainer)`
	display: flex;
	align-items: center;
	padding: 20px;
	margin: auto;

	select {
		margin-left: 10px;
	}
`;

const ChangePageButton = styled(CleanButton)`
	margin-left: 20px;
	margin-right: 20px;
	font-size: 30px;
	:disabled {
		opacity: 0.3;
	}
`;

export default DesktopTable;
