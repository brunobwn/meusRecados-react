import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, GlobalStyles, Theme, ThemeProvider } from '@mui/material';
import RoutesApp from './routes/RoutesApp';
import pastelTheme from './themes/themes';

const gStyle = (theme: Theme) => ({
	'#root': {
		minHeight: '100vh',
		overflow: 'hidden',
		background: 'linear-gradient(to top left, #31475E, #222932)',
	},
});

const globalStyle = <GlobalStyles styles={gStyle} />;
function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={pastelTheme}>
				<RoutesApp />
				<CssBaseline />
				{globalStyle}
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
