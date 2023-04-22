import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';

interface AuthProps {
	page: ReactElement;
}

const Auth: React.FC<AuthProps> = ({ page }) => {
	const { user, token } = useAppSelector((state) => state.auth);

	if (!user && !token) {
		return <Navigate to="/login" />;
	}

	return <React.Fragment>{page}</React.Fragment>;
};

export default Auth;
