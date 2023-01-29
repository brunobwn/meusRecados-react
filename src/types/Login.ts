import { z } from 'zod';

export const LoginSchema = z.object({
	email: z
		.string({ required_error: 'Campo obrigatório' })
		.email('Insira um e-mail válido'),
	password: z
		.string({ required_error: 'Campo obrigatório' })
		.min(5, 'A senha deve conter no mínimo 5 caracteres'),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
