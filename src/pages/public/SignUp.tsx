import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SignUpSchema, TSignUpSchema } from '../../types/SignUp';
import { useForm } from 'react-hook-form';
import {
	Box,
	Button,
	CircularProgress,
	Link,
	Stack,
	TextField,
	ThemeProvider,
	Typography,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContainerMotion } from '../../components/MotionMaterial';
import { BoxWrapperCss, ContainerFormCss, HeaderFormCss } from './styles';
import { fontSecularOne } from '../../themes/themes';
import { AppDispatch } from '../../app/store';
import { registerAuth } from '../../app/reducers/authSlice';
import { useEffect } from 'react';

const SignUp: React.FC = () => {
	const dispatch:AppDispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TSignUpSchema>({
		resolver: zodResolver(SignUpSchema),
	});
	const auth = useAppSelector((store) => store.auth);
	const navigate = useNavigate();

	function handleSignUp({ name, email, password, avatar}: TSignUpSchema) {
		dispatch(registerAuth({name, email, password, avatar: avatar || undefined}));
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
				<form onSubmit={handleSubmit(handleSignUp)}>
					<Stack gap={3} sx={{ paddingX: 2 }}>
					{ auth.error && <Typography variant="body2" align="center" color="error">{ auth.error }</Typography> }
						<TextField
							type="text"
							label="Nome"
							variant="outlined"
							color="secondary"
							error={!!errors.name}
							helperText={errors.name?.message}
							{...register('name')}
						/>
						<TextField
							type="email"
							label="E-mail"
							variant="outlined"
							color="secondary"
							error={!!errors.email}
							helperText={errors.email?.message}
							{...register('email')}
						/>
						<TextField
							type="text"
							label="Avatar URL (Opcional)"
							variant="outlined"
							color="secondary"
							error={!!errors.avatar}
							helperText={errors.avatar?.message}
							{...register('avatar')}
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
						<TextField
							type="password"
							label="Confirme a senha"
							variant="outlined"
							color="secondary"
							error={!!errors.passwordConfirm}
							helperText={errors.passwordConfirm?.message}
							{...register('passwordConfirm')}
						/>
						<Button
							color="secondary"
							variant="contained"
							type="submit"
							size="large"
							disabled={isSubmitting || auth.loading}
						>
							{(isSubmitting || auth.loading) ? (
								<CircularProgress thickness={3} size="1.6rem" />
							) : (
								'Cadastrar'
							)}
						</Button>
						<Typography variant="body2" align="center">
							Já tem conta?{' '}
							<Link
								variant="body1"
								component={RouterLink}
								to="/login"
								ml={1}
								fontWeight={500}
								underline="hover"
							>
								Acesse agora
							</Link>
						</Typography>
					</Stack>
				</form>
			</ContainerMotion>
		</Box>
	);
};

export default SignUp;
