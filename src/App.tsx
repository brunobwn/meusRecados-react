import { Provider } from 'react-redux';
import { store } from './app/store';
import RoutesApp from './RoutesApp';

function App() {
	return (
		<Provider store={store}>
			<RoutesApp />
		</Provider>
	);
}

export default App;
