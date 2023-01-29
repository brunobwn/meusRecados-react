import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import RoutesApp from './routes/RoutesApp';
import defaultTheme from './themes/themes';

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={defaultTheme}>
				<RoutesApp />
				<CssBaseline />
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
