import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
	colors: {
		offWhite: '#f5f7f9',
		lightGrey: '#2125292b',
		white: '#fff',
	},
};

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
