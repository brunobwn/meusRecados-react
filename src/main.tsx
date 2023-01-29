import { CircularProgress } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { persistor, store } from './app/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate
				loading={<CircularProgress color="primary" />}
				persistor={persistor}
			>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
