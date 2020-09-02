import { useState, useEffect } from 'react';

const useIsMobile = () => {
	const MOBILE_DIMENSION = 400;

	const getWindowDimensions = () => {
		const { innerWidth: width, innerHeight: height } = window;
		return {
			width,
			height,
		};
	};

	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	const isMobile = () => {
		return windowDimensions.width <= MOBILE_DIMENSION;
	};

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isMobile();
};

export default useIsMobile;
