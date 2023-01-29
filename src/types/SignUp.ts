import { z } from 'zod';

export const SignUpSchema = z
	.object({
		name: z
			.string({ required_error: 'Campo obrigatório' })
			.min(3, 'O nome deve conter no mínimo 3 letras'),
		email: z
			.string({ required_error: 'Campo obrigatório' })
			.email('Insira um e-mail válido'),
		avatar: z.string().optional(),
		password: z
			.string({ required_error: 'Campo obrigatório' })
			.min(5, 'A senha deve conter no mínimo 5 caracteres'),
		passwordConfirm: z
			.string({ required_error: 'Campo obrigatório' })
			.min(5, 'A senha deve conter no mínimo 5 caracteres'),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'As senhas não conferem',
		path: ['passwordConfirm'],
	});

export type TSignUpSchema = z.infer<typeof SignUpSchema>;
