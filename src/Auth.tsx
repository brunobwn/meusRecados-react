import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import api from './service/ApiService';

interface AuthProps {
	page: ReactElement;
}

const Auth: React.FC<AuthProps> = ({ page }) => {
	const { user, token } = useAppSelector((state) => state.auth);

	if (!user && !token) {
		return <Navigate to="/login" />;
	}
	useEffect(() => {
		if(token) {
			api.setToken(token);
		} else {
			api.resetToken();
		}
	}, [token]);
	return <React.Fragment>{page}</React.Fragment>;
};

export default Auth;
