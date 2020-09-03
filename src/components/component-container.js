import React from 'react';
import styled from 'styled-components';

const ComponentContainer = ({ className, children }) => <StyledContainer className={className}>{children}</StyledContainer>;

const StyledContainer = styled.div`
	padding-top: 50px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
`;

export default ComponentContainer;
