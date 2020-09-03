import React from 'react';
import Theme from '../components/theme';
import LoggedInRoute from '../components/logged-in-route';
import CurrentSeasonDriversPage from '../pages/current-season-drivers';
import DriverRaces from '../pages/driver-races';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import LoginRegister from '../pages/login-register';
import Menu from '../components/menu';

function App() {
	return (
		<Theme>
			<div>
				<Router>
					<Menu />
					<Switch>
						<LoggedInRoute exact path='/drivers' Component={CurrentSeasonDriversPage}></LoggedInRoute>
						<LoggedInRoute exact path='/driver/:driverId/races' Component={DriverRaces}></LoggedInRoute>
						<Route exact path='/connect'>
							<LoginRegister />
						</Route>
						<LoggedInRoute id='Default-Route'>
							<Redirect to='/drivers' />
						</LoggedInRoute>
					</Switch>
				</Router>
			</div>
		</Theme>
	);
}

export default App;
