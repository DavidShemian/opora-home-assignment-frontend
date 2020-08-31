import React from 'react';
import styled from 'styled-components';

export const CardSeparator = () => {
	return <Separator />;
};

const Separator = styled.hr`
	display: block;
	height: 1px;
	border: 0;
	border-top: 1px solid #ccc;
	margin: 1px 0;
	padding: 0;
`;
