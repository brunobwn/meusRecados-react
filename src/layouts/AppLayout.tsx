import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DrawerMenu from '../components/DrawerMenu';
import MenuAppBar from '../components/MenuAppBar';

export const drawerWidth = 200;

export const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppLayout: React.FC = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	function toggleDrawer() {
		setIsDrawerOpen(!isDrawerOpen);
	}

	function handleDrawerClose() {
		setIsDrawerOpen(false);
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<MenuAppBar toggleDrawer={toggleDrawer} />
			<DrawerMenu isOpen={isDrawerOpen} closeDrawer={handleDrawerClose} />
			<Box component="main" sx={{ flexGrow: 1, px: 3, pb: 3 }}>
				<DrawerHeader />
				<Outlet />
			</Box>
		</Box>
	);
};

export default AppLayout;
