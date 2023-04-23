import React, { useEffect, useRef, useState } from 'react';
import {
	Box,
	Typography,
	Stack,
	Button,
	Input,
	TextField,
} from '@mui/material';
import { ContentCardCSS, newContentCardCSS } from './style';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { addMessage } from '../../app/reducers/messagesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import api from '../../service/ApiService';

const NewMessageCard: React.FC = () => {
	const [isActive, setActive] = useState(false);
	const subjectRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const auth = useAppSelector((store) => store.auth);

	const firstClick = { subject: true, text: true };

	function handleCardClick() {
		setActive(true);
	}
	function handleFirstClick(input: string) {
		if (input === 'subject' && firstClick.subject) {
			subjectRef.current!.innerText = '';
			firstClick.subject = false;
		}
		if (input === 'text' && firstClick.text) {
			textRef.current!.innerText = '';
			firstClick.text = false;
		}
	}

	function handleBlur(input: string) {
		if (input === 'subject' && subjectRef.current?.innerText === '') {
			subjectRef.current!.innerText = 'Digite um título';
			firstClick.subject = true;
		}
		if (input === 'text' && textRef.current?.innerText === '') {
			textRef.current!.innerText = 'E uma mensagem';
			firstClick.text = true;
		}
	}

	function handleResetCard() {
		subjectRef.current!.innerText = 'Digite um título';
		textRef.current!.innerText = 'E uma mensagem';
		firstClick.subject = true;
		firstClick.text = true;
		setActive(false);
	}

	async function handleSaveCard() {
		if (
			!subjectRef.current!.innerText ||
			!textRef.current!.innerText ||
			subjectRef.current!.innerText === 'Digite um título' ||
			textRef.current!.innerText === 'E uma mensagem'
		) {
			alert('todos os campos devem ser preenchidos');
			return;
		}
		const newMessage = {
			subject: subjectRef.current!.innerText,
			text: textRef.current!.innerText,
		};
		const res = await api.createMessage(newMessage);
		if (res.status != 201) {
			console.log('erro ao criar mensagem');
		}
		dispatch(addMessage(res.data));
		handleResetCard();
	}
	return isActive ? (
		<Box sx={ContentCardCSS}>
			<Typography
				variant="h6"
				component="div"
				contentEditable={true}
				ref={subjectRef}
				onClick={() => handleFirstClick('subject')}
				onBlur={() => handleBlur('subject')}
				suppressContentEditableWarning={true}
			>
				Digite um título
			</Typography>
			<Typography
				variant="body1"
				component="div"
				sx={{ flexGrow: 1 }}
				contentEditable={true}
				ref={textRef}
				onClick={() => handleFirstClick('text')}
				onBlur={() => handleBlur('text')}
				suppressContentEditableWarning={true}
			>
				E uma mensagem
			</Typography>
			<Stack direction="row" justifyContent="space-between">
				<Button color="error" onClick={handleResetCard}>
					Cancelar
				</Button>
				<Button color="success" onClick={handleSaveCard}>
					Salvar
				</Button>
			</Stack>
		</Box>
	) : (
		<Box sx={newContentCardCSS} onClick={handleCardClick}>
			<AddCircleOutlineIcon
				color="success"
				fontSize="large"
				sx={{ transition: 'all 300ms ease' }}
			/>
		</Box>
	);
};

export default NewMessageCard;
