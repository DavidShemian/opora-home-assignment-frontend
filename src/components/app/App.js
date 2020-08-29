import React from 'react';
import DriversTable from '../drivers-table/drivers-table';
import styled from 'styled-components';
import Theme from '../theme/theme';

function App() {
	return (
		<Theme>
			<Container>
				<DriversTable />
			</Container>
		</Theme>
	);
}

const Container = styled.div``;

export default App;
