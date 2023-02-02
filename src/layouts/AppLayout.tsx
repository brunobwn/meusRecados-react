import React from 'react';
import MenuAppBar from '../components/MenuAppBar';

interface AppLayoutProps {
	children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
	return (
		<React.Fragment>
			<MenuAppBar />
			{children}
		</React.Fragment>
	);
};

export default AppLayout;
