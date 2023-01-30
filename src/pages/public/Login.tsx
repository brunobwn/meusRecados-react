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
import { signIn } from '../../app/reducers/authSlice';
import { Theme, ThemeProvider } from '@mui/material/styles';
import { fontSecularOne } from '../../themes/themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, TLoginSchema } from '../../types/Login';
import { ContainerMotion } from '../../components/MotionMaterial';
import { BoxWrapperCss, ContainerFormCss, HeaderFormCss } from './styles';

const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TLoginSchema>({
		resolver: zodResolver(LoginSchema),
	});
	const users = useAppSelector((state) => state.users);
	const navigate = useNavigate();

	async function handleLogin({ email, password }: TLoginSchema) {
		const user = users.find((user) => user.email === email);
		if (user) {
			if (user.password === password) {
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
							disabled={isSubmitting}
						>
							{isSubmitting ? (
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
