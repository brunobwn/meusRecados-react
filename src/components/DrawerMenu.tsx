import React from 'react';
import {
	Drawer as MuiDrawer,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	List,
} from '@mui/material';
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles';
import { HomeOutlined } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';
import { DrawerHeader, drawerWidth } from '../layouts/AppLayout';

const data = [
	{
		name: 'Home',
		icon: <HomeOutlined />,
	},
	{
		name: 'Novo recado',
		icon: <CreateIcon />,
	},
	{
		name: 'Home 3',
		icon: <HomeOutlined />,
	},
	{
		name: 'Home 4',
		icon: <HomeOutlined />,
	},
];

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

interface DrawerMenuProps {
	isOpen: boolean;
	closeDrawer: () => void;
	children?: null;
}

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, closeDrawer }) => {
	const theme = useTheme();

	return (
		<Drawer variant="permanent" open={isOpen} hideBackdrop={true}>
			<DrawerHeader />
			<List>
				{data.map((item, index) => (
					<ListItem key={index} disablePadding sx={{ display: 'block' }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: isOpen ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: isOpen ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.name} sx={{ opacity: isOpen ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default DrawerMenu;
