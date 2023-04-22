import {
	Box,
	Button,
	CircularProgress,
	Link,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ThemeProvider } from '@mui/material/styles';
import { fontSecularOne } from '../../themes/themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, TLoginSchema } from '../../types/Login';
import { ContainerMotion } from '../../components/MotionMaterial';
import { BoxWrapperCss, ContainerFormCss, HeaderFormCss } from './styles';
import { login } from '../../app/reducers/authSlice';
import { AppDispatch } from '../../app/store';
import { useEffect } from 'react';

const Login: React.FC = () => {
	const dispatch:AppDispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TLoginSchema>({
		resolver: zodResolver(LoginSchema),
	});
	const auth = useAppSelector((store) => store.auth);
	const navigate = useNavigate();

	function handleLogin({ email, password }: TLoginSchema) {
		dispatch(login({email, password}));
	}

	useEffect(()=>{
		if(auth.user && auth.token) navigate('/');
	}, [auth.user]);
	return (
		<Box sx={BoxWrapperCss}>
			<ContainerMotion
				maxWidth="xs"
				sx={ContainerFormCss}
				initial={{ y: -1000, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ type: 'spring', duration: 0.7 }}
				exit={{ y: 1000, opacity: 0 }}
			>
				<Box sx={HeaderFormCss}>
					<ThemeProvider theme={fontSecularOne}>
						<Typography variant="h5" align="center">
							meus
							<Typography component="span" variant="h4" fontWeight="400">
								Recados
							</Typography>
						</Typography>
					</ThemeProvider>
				</Box>
				<form onSubmit={handleSubmit(handleLogin)}>
					<Stack gap={3} sx={{ paddingX: 2 }}>
						{ auth.error && <Typography variant="body2" align="center" color="error">{ auth.error }</Typography> }
						<TextField
							type="text"
							label="E-mail"
							variant="outlined"
							color="secondary"
							error={!!errors.email}
							helperText={errors.email?.message}
							{...register('email', { required: true })}
						/>
						<TextField
							type="password"
							label="Senha"
							variant="outlined"
							color="secondary"
							error={!!errors.password}
							helperText={errors.password?.message}
							{...register('password')}
						/>
						<Button
							color="secondary"
							variant="contained"
							type="submit"
							size="large"
							disabled={(isSubmitting || auth.loading)}
						>
							{(isSubmitting || auth.loading) ? (
								<CircularProgress thickness={3} size="1.6rem" />
							) : (
								'Entrar'
							)}
						</Button>
						<Typography variant="body2" align="center">
							Ainda não é cadastrado?{' '}
							<Link
								variant="body1"
								component={RouterLink}
								to="/signup"
								ml={1}
								fontWeight={500}
								underline="hover"
							>
								Criar conta
							</Link>
						</Typography>
					</Stack>
				</form>
			</ContainerMotion>
		</Box>
	);
};

export default Login;
