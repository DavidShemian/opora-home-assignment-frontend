import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getIsLoggedIn } from '../services/authentication';

const LoggedInRoute = ({ Component, ...rest }) => {
	const isLoggedIn = getIsLoggedIn();
    // console.log('LoggedInRoute -> isLoggedIn', isLoggedIn);
	return <Route {...rest} render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to='/connect' />)} />;
};

export default LoggedInRoute;
