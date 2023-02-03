import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	addMessage,
	removeMessage,
	selectUserMessages,
	updateMessage,
} from '../app/reducers/messagesSlice';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Messages: React.FC = () => {
	const auth = useAppSelector((store) => store.auth);
	const messages = useAppSelector(selectUserMessages(auth.user.id));
	const dispatch = useAppDispatch();
	const [editId, setEditId] = useState('');
	const [subject, setSubject] = useState('');
	const [text, setText] = useState('');
	const [form, setForm] = useState<'new' | 'edit' | null>(null);

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

	function handleSearch() {}
	return (
		<Container>
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

			<Typography variant="h4" color="white" mt={2}>
				Mensagens{' '}
				<Button
					variant="contained"
					color="success"
					onClick={() => setForm('new')}
					sx={{ ml: 'auto' }}
				>
					Cadastrar nova
				</Button>
			</Typography>
			<Stack
				direction={{ sm: 'column', md: 'row' }}
				gap={2}
				sx={{ backgroundColor: 'white', borderRadius: 2, p: 2, mt: 2 }}
			>
				<TextField
					color="secondary"
					size="small"
					label="Buscar nos recados"
					id="searchStringMessage"
					focused
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					sx={{ flexGrow: 1 }}
				/>
				<TextField
					type="date"
					color="secondary"
					size="small"
					label="Até a data"
					id="searchDateMessage"
					focused
				/>
				<FormControl color="secondary" sx={{ minWidth: ['100%', 200] }} focused>
					<InputLabel id="searchStatusMessage-label">Status</InputLabel>
					<Select
						labelId="searchStatusMessage-label"
						id="searchStatusMessage"
						value={10}
						label="Status"
						color="secondary"
						size="small"
					>
						<MenuItem value={10}>Todos</MenuItem>
						<MenuItem value={20}>Completado</MenuItem>
						<MenuItem value={30}>Em andamento</MenuItem>
					</Select>
				</FormControl>
				<Button color="secondary" variant="contained" sx={{ flexGrow: 0.5 }}>
					Buscar
				</Button>
			</Stack>
			<Box>
				<Grid container mt={2} spacing={2} direction="row-reverse">
					{messages.map((message) => (
						<Grid item xs={12} sm={6} md={4} lg={3}>
							{message.subject}
						</Grid>
					))}
				</Grid>
			</Box>

			{/* {messages.map((message) => (
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
			))} */}
		</Container>
	);
};

export default Messages;
