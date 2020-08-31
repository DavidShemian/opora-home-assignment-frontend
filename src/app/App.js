import React from 'react';
import styled from 'styled-components';
import Theme from '../components/theme/theme';
import DriversPage from '../pages/current-season-drivers';
import DriverRaces from '../pages/driver-races';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Theme>
			<Container>
				<Router>
					<Switch>
						<Route exact path='/'>
							<DriversPage />
						</Route>
						<Route exact path='/driver/:driverId/races'>
							<DriverRaces />
						</Route>
					</Switch>
				</Router>
			</Container>
		</Theme>
	);
}

const Container = styled.div``;

export default App;
