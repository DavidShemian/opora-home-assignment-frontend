import React from 'react';
import styled from 'styled-components';

const Card = (props) => {
	return <Div {...props}>{props.children}</Div>;
};

const Div = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	background-color: ${({ theme }) => theme.colors.lightGrey};
	width: 80%;
	margin-top: 10px;
`;

export default Card;
