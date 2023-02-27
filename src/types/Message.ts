export type Message = {
	messageId: string;
	userId: string;
	subject: string;
	text: string;
	date: Date;
};

export type EditedMessage = Omit<Message, 'userId'>;
