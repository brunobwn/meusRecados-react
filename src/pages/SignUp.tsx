import React, { FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addUser } from '../app/reducers/usersSlice';

const SignUp: React.FC = () => {
	const dispatch = useAppDispatch();
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);
	const nameInput = useRef<HTMLInputElement>(null);
	const avatarInput = useRef<HTMLInputElement>(null);
	const passwordConfirmInput = useRef<HTMLInputElement>(null);
	const users = useAppSelector((state) => state.users);
	const navigate = useNavigate();

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		if (
			!nameInput.current?.value ||
			!emailInput.current?.value ||
			!avatarInput.current?.value ||
			!passwordInput.current?.value ||
			!passwordConfirmInput.current?.value
		) {
			alert('Todos os campos precisam ser preenchidos');
			return;
		}
		if (passwordInput.current?.value !== passwordConfirmInput.current?.value) {
			alert('As senhas não coincidem');
			return;
		}

		const user = users.find((user) => user.email === emailInput.current?.value);
		if (!user) {
			const newUser = {
				name: nameInput.current?.value,
				email: emailInput.current?.value,
				password: passwordInput.current?.value,
				avatar: avatarInput.current?.value,
			};
			dispatch(addUser(newUser));
			navigate('/');
		} else {
			alert('Já existe um usuário com este e-mail');
		}
	}
	return (
		<React.Fragment>
			<h1>Cadastrar</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Nome"
					ref={nameInput}
				/>
				<input
					type="text"
					name="email"
					id="email"
					placeholder="E-mail"
					ref={emailInput}
				/>
				<input
					type="text"
					name="avatar"
					id="avatar"
					placeholder="Avatar URL"
					ref={avatarInput}
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Senha"
					ref={passwordInput}
				/>
				<input
					type="password"
					name="passwordConfirm"
					id="passwordConfirm"
					placeholder="Confirme a senha"
					ref={passwordConfirmInput}
				/>
				<button type="submit">Cadastrar</button>
			</form>
			<Link to="/login">Ja tenho uma conta</Link>
		</React.Fragment>
	);
};

export default SignUp;
