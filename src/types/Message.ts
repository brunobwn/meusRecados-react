export type Message = {
	messageId: string;
	userId: string;
	subject: string;
	text: string;
	createdAt: string;
	editedAt: string | undefined;
};
