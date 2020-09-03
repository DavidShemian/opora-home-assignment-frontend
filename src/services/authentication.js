export const saveTokenToLocalStorage = (token) => {
	localStorage.setItem('token', token);
};

export const getIsLoggedIn = () => {
	const token = getToken();

	return !!token;
};

export const getToken = () => {
	return localStorage.getItem('token');
};

export const removeTokenFromLocalStorage = () => {
	localStorage.removeItem('token');
};
