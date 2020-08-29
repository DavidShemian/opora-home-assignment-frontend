import React from 'react';
import styled from 'styled-components';

const ComponentContainer = ({ className, children }) => <StyledContainer className={className}>{children}</StyledContainer>;

const StyledContainer = styled.div`
	padding-top: 20px;
	margin: 0 auto 40px auto;
	width: 95%;

	@media (max-width: $screen-md) {
		padding-top: 70px;
	}
`;

export default ComponentContainer;
