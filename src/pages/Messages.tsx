import React, { FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	addMessage,
	removeMessage,
	selectUserMessages,
	updateMessage,
} from '../app/slices/messagesSlice';
import { v4 as uuid } from 'uuid';
import { Message } from '../types/Message';
import { RootState } from '../app/store';
import { logout } from '../app/slices/authSlice';

const Messages: React.FC = () => {
	const auth = useAppSelector((store) => store.auth);
	const messages = useAppSelector(selectUserMessages(auth.user.id));
	const dispatch = useAppDispatch();
	const [editId, setEditId] = useState('');
	const [subject, setSubject] = useState('');
	const [text, setText] = useState('');
	const [form, setForm] = useState<'new' | 'edit' | null>(null);
	// const messageById = useAppSelector(selectById());

	function clearInputs() {
		setText('');
		setSubject('');
	}

	function handleSubmitNew(event: FormEvent) {
		event.preventDefault();
		if (!subject || !text) {
			alert('todos os campos devem ser preenchidos');
			return;
		}
		dispatch(addMessage({ userId: auth.user.id, subject, text }));
		setForm(null);
		clearInputs();
	}

	function handleSubmitEdit(event: FormEvent) {
		event.preventDefault();
		if (!subject || !text || !editId) {
			alert('todos os campos devem ser preenchidos');
		}
		dispatch(updateMessage({ messageId: editId, text, subject }));
	}

	function handleClickEdit(id: string) {
		setEditId(id);
		const messageEdit = messages.find((message) => message.messageId === id);
		if (messageEdit) {
			setSubject(messageEdit.subject);
			setText(messageEdit.text);
		}
		setForm('edit');
	}

	return (
		<React.Fragment>
			{form === 'new' ? (
				<form onSubmit={handleSubmitNew}>
					<h3>Novo recado</h3>
					<input
						type="text"
						name="subject"
						placeholder="Titulo"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
					/>
					<input
						type="text"
						name="text"
						id="text"
						placeholder="Mensagem"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<button type="submit">Enviar</button>
				</form>
			) : form === 'edit' ? (
				<form onSubmit={handleSubmitEdit}>
					<h3>Editar recado</h3>
					<input
						type="text"
						name="subject"
						placeholder="Titulo"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
					/>
					<input
						type="text"
						name="text"
						id="text"
						placeholder="Mensagem"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<button type="submit">Enviar</button>
				</form>
			) : null}

			<h1>
				Mensagens <button onClick={() => setForm('new')}>Cadastrar nova</button>
			</h1>
			{messages.map((message) => (
				<div key={message.messageId} style={{ position: 'relative' }}>
					<h4>{message.subject}</h4>
					<p>{message.text}</p>
					<hr />
					<div
						style={{
							position: 'absolute',
							top: 0,
							right: 0,
							width: 'fit-content',
							display: 'flex',
							gap: '2rem',
						}}
					>
						<button onClick={() => dispatch(removeMessage(message.messageId))}>
							Deletar
						</button>
						<button onClick={() => handleClickEdit(message.messageId)}>Editar</button>
					</div>
				</div>
			))}
			<button onClick={() => dispatch(logout())}>Logout</button>
		</React.Fragment>
	);
};

export default Messages;
