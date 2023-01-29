import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Auth from '../Auth';
import Login from '../pages/public/Login';
import Messages from '../pages/Messages';
import SignUp from '../pages/public/SignUp';

const RoutesApp = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes key={location.pathname} location={location}>
				<Route path="/" element={<Auth page={<Messages />} />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</AnimatePresence>
	);
};

export default RoutesApp;
