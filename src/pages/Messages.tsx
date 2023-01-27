import React, { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { add, allMessages, selectMessages } from '../app/slices/messagesSlice';
import { v4 as uuid } from 'uuid';
import { Message } from '../types/Message';
import { serialize } from 'v8';
import { log } from 'console';

const Messages: React.FC = () => {
	const messages = selectMessages((state) => state.messages);
	const dispatch = useAppDispatch();
	const subjectInput = useRef<HTMLInputElement>(null);
	const textInput = useRef<HTMLInputElement>(null);

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		const subject = subjectInput.current?.value ?? '';
		const text = textInput.current?.value ?? '';
		if (!subject || !text) {
			alert('todos os campos devem ser preenchidos');
		}
		const message: Message = {
			messageId: uuid(),
			userId: 'e43680df-e6ab-4509-92ac-3c9ca6a82613',
			subject,
			text,
			// createdAt: new Date().toString(),
			// editedAt: null,
		};
		dispatch(add(message));
	}
	return (
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<input type="text" name="subject" placeholder="Titulo" ref={subjectInput} />
				<input
					type="text"
					name="text"
					id="text"
					placeholder="Mensagem"
					ref={textInput}
				/>
				<button type="submit">Enviar</button>
			</form>
			<h1>Mensagens</h1>
			{/* {selectMessages.((message) => (
				<>
					<h4>{message.subject}</h4>
					<p>{message.text}</p>
					<hr />
				</>
			))} */}
		</React.Fragment>
	);
};

export default Messages;
