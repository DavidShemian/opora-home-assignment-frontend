import React from 'react';
import styled from 'styled-components';
import MoonLoader from 'react-spinners/ClipLoader';

const CenteredSpinner = ({ className }) => {
	return (
		<CenteredSpinnerContainer>
			<MoonLoader className={className} />
		</CenteredSpinnerContainer>
	);
};

const CenteredSpinnerContainer = styled.div`
	position: absolute;
	top: 30%;
`;

export default CenteredSpinner;
