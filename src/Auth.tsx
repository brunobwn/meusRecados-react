import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';

interface AuthProps {
	page: ReactElement;
}

const Auth: React.FC<AuthProps> = ({ page }) => {
	// TODO: Verifica se user esta logado, se sim renderiza componente, se nao redireciona para login
	const { user, isAuthenticated } = useAppSelector((state) => state.auth);

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return <React.Fragment>{page}</React.Fragment>;
};

export default Auth;
