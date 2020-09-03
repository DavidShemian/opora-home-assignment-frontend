import axios from 'axios';
import { getToken, removeTokenFromLocalStorage } from '../services/authentication';

export const getFullEndPoint = (endpoint) => {
	return `${process.env.REACT_APP_SERVER_BASE_URL}${endpoint}`;
};

export const httpResponseCodes = {
	NOT_FOUND: 404,
	UNAUTHORIZED: 401,
	CONFLICT: 409,
};

export const setAuthorizationHeaderToAllRequests = () => {
	axios.interceptors.request.use((config) => {
        const token = getToken();
		config.headers.Authorization = token;

		return config;
	});
};

export const setUnauthorizedInterceptor = () => {
	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response.status === httpResponseCodes.UNAUTHORIZED) {
				removeTokenFromLocalStorage();
				alert('Please login in order to continue');
				window.location.reload();
			}

			throw error;
		}
	);
};
