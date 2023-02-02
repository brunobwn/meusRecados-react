import * as React from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../app/reducers/authSlice';
import { fontSecularOne } from '../themes/themes';

export default function MenuAppBar() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const dispatch = useAppDispatch();
	const auth = useAppSelector((state) => state.auth);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<ThemeProvider theme={fontSecularOne}>
						<Typography variant="h6" sx={{ flexGrow: 1 }}>
							meus
							<Typography component="span" variant="h5" fontWeight="400">
								Recados
							</Typography>
						</Typography>
					</ThemeProvider>

					<div>
						<IconButton
							size="medium"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
							sx={{ borderRadius: 4 }}
						>
							<Typography mr={2}>{auth.user.name}</Typography>
							<Avatar
								alt={auth.user.name}
								src={auth.user?.avatar}
								sx={{ border: 2, borderColor: (theme) => theme.palette.primary.dark }}
							/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Minha conta</MenuItem>
							<MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
