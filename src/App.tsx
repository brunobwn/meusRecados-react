import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './routes/RoutesApp';

function App() {
	return (
		<BrowserRouter>
			<RoutesApp />
			<CssBaseline />
		</BrowserRouter>
	);
}

export default App;
