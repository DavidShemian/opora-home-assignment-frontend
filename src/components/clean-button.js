import React from 'react';
import styled from 'styled-components';

const CleanButton = (props) => {
	return <Button {...props} />;
};

const Button = styled.button`
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`;

export default CleanButton;
