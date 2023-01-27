import { Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Login from './pages/Login';
import Messages from './pages/Messages';

const RoutesApp = () => {
	return (
		<Routes>
			<Route path="/" element={<Auth page={<Messages />} />} />
			{/* <Route path="/" element={<Messages />} /> */}
			<Route path="/login" element={<Login />} />
		</Routes>
	);
};

export default RoutesApp;
