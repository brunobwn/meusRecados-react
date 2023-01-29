import {
	Box,
	Button,
	Container,
	Link,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { FormEvent, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signIn } from '../app/reducers/authSlice';
import { Theme, ThemeProvider, useTheme } from '@mui/material/styles';
import { fontSolitreo } from '../themes/themes';

const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);
	const users = useAppSelector((state) => state.users);
	const navigate = useNavigate();

	const theme = useTheme();

	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const user = users.find((user) => user.email === emailInput.current?.value);
		if (user) {
			if (user.password === passwordInput.current?.value) {
				const { password, ...authUser } = user;
				dispatch(signIn(authUser));
				navigate('/');
			} else {
				alert('senha errada');
			}
		} else {
			alert('email errado');
		}
	}
	return (
		<Box sx={BoxWrapperCss}>
			<Container maxWidth="xs" sx={ContainerFormCss}>
				<Box sx={HeaderFormCss}>
					<ThemeProvider theme={fontSolitreo}>
						<Typography variant="h5" align="center">
							meus
							<Typography component="span" variant="h4" fontWeight="400">
								Recados
							</Typography>
						</Typography>
					</ThemeProvider>
				</Box>
				<form onSubmit={handleSubmit}>
					<Stack gap={2} sx={{ paddingX: 3 }}>
						<TextField
							type="text"
							id="email"
							label="E-mail"
							variant="standard"
							inputRef={emailInput}
							color="secondary"
						/>
						<TextField
							type="password"
							id="password"
							label="Senha"
							variant="standard"
							color="secondary"
							inputRef={passwordInput}
						/>
						<Button
							color="primary"
							variant="contained"
							type="submit"
							size="large"
							sx={{ marginTop: 2 }}
						>
							Entrar
						</Button>
						<Typography variant="body2" mt={1}>
							Ainda não é cadastrado?{' '}
							<Link
								variant="body1"
								component={RouterLink}
								to="/signup"
								ml={1}
								underline="hover"
							>
								Criar conta
							</Link>
						</Typography>
					</Stack>
				</form>
			</Container>
		</Box>
	);
};

export default Login;

const BoxWrapperCss = {
	display: 'grid',
	placeItems: 'center',
	minHeight: '100vh',
	background:
		"url('https://images.unsplash.com/photo-1442422502730-a90f72460717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cml2ZXJ8fHx8fHwxNjc0OTM5MjAw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080')",
	backgroundSize: 'cover',
};

const ContainerFormCss = {
	background: 'white',
	borderRadius: 2,
	padding: 3,
	boxShadow: 5,
};

const HeaderFormCss = {
	borderRadius: 2,
	padding: 2,
	marginTop: -6,
	marginBottom: 3,
	background: (theme: Theme) => theme.palette.primary.main,
	color: 'white',
	boxShadow: 2,
};
