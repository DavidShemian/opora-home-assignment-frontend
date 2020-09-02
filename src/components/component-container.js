import React from 'react';
import styled from 'styled-components';

const ComponentContainer = ({ className, children }) => <StyledContainer className={className}>{children}</StyledContainer>;

const StyledContainer = styled.div`
	padding-top: 50px;
	padding-bottom: 20px;
`;

export default ComponentContainer;
