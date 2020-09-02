import React from 'react';
import styled from 'styled-components';
import CleanButton from './clean-button';
import { removeTokenFromLocalStorage } from '../services/authentication';
import { useHistory, withRouter } from 'react-router-dom';

const Menu = () => {
	const history = useHistory();

	const logout = () => {
		removeTokenFromLocalStorage();
		history.push('/connect');
	};

	return (
		<Container>
			<MenuButton onClick={logout}>Logout</MenuButton>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	position: absolute;
	z-index: 100;
	-webkit-box-shadow: 0 3px 6px -6px #777;
	-moz-box-shadow: 0 3px 6px -6px #777;
	box-shadow: 0 3px 6px -6px #777;
`;

const MenuButton = styled(CleanButton)`
	margin-left: 20px;
`;

export default withRouter(Menu);
