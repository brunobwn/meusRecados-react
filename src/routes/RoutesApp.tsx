import { Routes, Route } from 'react-router-dom';
import Auth from '../Auth';
import Login from '../pages/Login';
import Messages from '../pages/Messages';
import SignUp from '../pages/SignUp';

const RoutesApp = () => {
	return (
		<Routes>
			<Route path="/" element={<Auth page={<Messages />} />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
		</Routes>
	);
};

export default RoutesApp;
