import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
	palette: {
		primary: {
			main: '#e91e63',
			gradient: 'linear-gradient(to left, #EC407A, #D81B60)',
		},
		secondary: {
			main: '#7b809a',
			gradient: 'linear-gradient(to left, #747b8a, #495361)',
		},
		info: {
			main: '#1A73E8',
			gradient: 'linear-gradient(to left, #49a3f1, #1A73E8)',
		},
		success: {
			main: '#4CAF50',
			gradient: 'linear-gradient(to left, #66BB6A, #43A047)',
		},
		warning: {
			main: '#fb8c00',
			gradient: 'linear-gradient(to left, #FFA726, #FB8C00)',
		},
		error: {
			main: '#f44335',
			gradient: 'linear-gradient(to left, #EF5350, #E53935)',
		},
		light: {
			main: '#f0f2f5',
			gradient: 'linear-gradient(to left, #EBEFF4, #CED4DA)',
		},
		dark: {
			main: '#344767',
			gradient: 'linear-gradient(to left, #42424a, #191919)',
		},
	},
});

export const fontSolitreo = createTheme({
	typography: {
		fontFamily: ['Solitreo', 'cursive'].join(','),
	},
});

export default defaultTheme;
