export type Message = {
	id: string;
	userId: string;
	subject: string;
	text: string;
	is_active: boolean;
	created_at: string;
	edited_at: string;
};

export type EditedMessage = Omit<Message, 'userId'>;
