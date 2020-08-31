import React, { Fragment } from 'react';
import styled from 'styled-components';

const CardRow = ({ title, value }) => {
	return (
		<Fragment>
			<Row>
				<Column>{title}</Column>
				<Value>{value}</Value>
			</Row>
		</Fragment>
	);
};

const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px;
`;

const Column = styled.span`
	margin-left: 10px;
	font-weight: bold;
	text-transform: capitalize;
`;

const Value = styled.span`
	margin-right: 10px;
`;

export default CardRow;
