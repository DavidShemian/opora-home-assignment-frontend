export const getFullEndPoint = (endpoint) => {
	return `${process.env.REACT_APP_SERVER_BASE_URL}${endpoint}`;
};
