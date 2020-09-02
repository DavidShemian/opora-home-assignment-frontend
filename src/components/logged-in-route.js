import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getIsLoggedIn } from '../services/authentication';

const LoggedInRoute = ({ Component, ...rest }) => {
	const isLoggedIn = getIsLoggedIn();
	return <Route {...rest} render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to='/connect' />)} />;
};

export default LoggedInRoute;
