import React, { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signIn } from '../app/slices/authSlice';

const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		const users = useAppSelector((state) => state.users);
		const user = users.find((user) => user.email === emailInput.current?.value);
		if (user) {
			if (user.password === passwordInput.current?.value) {
				const { password, ...authUser } = user;
				dispatch(signIn(authUser));
			} else {
				alert('senha errada');
			}
		} else {
			alert('email errado');
		}
	}
	return (
		<React.Fragment>
			<h1>Login2</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="email"
					id="email"
					placeholder="Email"
					ref={emailInput}
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					ref={passwordInput}
				/>
				<button type="submit">Entrar</button>
			</form>
		</React.Fragment>
	);
};

export default Login;
