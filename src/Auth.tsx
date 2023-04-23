import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import api from './service/ApiService';

interface AuthProps {
	page: ReactElement;
}

const Auth: React.FC<AuthProps> = ({ page }) => {
	const { user, token } = useAppSelector((state) => state.auth);

	useEffect(() => {
		api.setUser(user, token);
	}, [token, user]);

	if (!token || !user) {
		return <Navigate to="/login" />;
	}

	return <React.Fragment>{page}</React.Fragment>;
};

export default Auth;
