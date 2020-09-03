import React from 'react';
import styled from 'styled-components';

const PageTitle = ({ children }) => {
	return <Title>{children}</Title>;
};

const Title = styled.div`
	display: flex;
	align-items: center;
    margin: auto;
	h1,
	h5 {
		margin-right: 20px;
	}
`;

export default PageTitle;
