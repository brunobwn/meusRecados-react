import { useRef, useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { ContentCardCSS, newContentCardCSS } from './style';
import {
	deleteMessage,
	updateMessage,
} from '../../app/reducers/messagesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Message } from '../../types/Message';
import { format } from 'date-fns';

interface MessageCardProps {
	data: Message;
}

const MessageCard = ({ data }: MessageCardProps) => {
	const [isActive, setActive] = useState(false);
	const subjectRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const auth = useAppSelector((store) => store.auth);

	const { id, subject, text, is_active, edited_at } = data;

	const firstClick = { subject: true, text: true };

	function handleDeleteCard() {
		if (confirm('Confirme para excluir')) {
			setActive(false);
			dispatch(deleteMessage(id));
		} else {
			setActive(false);
		}
	}

	function handleSaveCard() {
		if (!subjectRef.current!.innerText || !textRef.current!.innerText) {
			alert('todos os campos devem ser preenchidos');
			return;
		}
		// const editedMessage = {
		// 	id,
		// 	subject: subjectRef.current!.innerText,
		// 	text: textRef.current!.innerText,
		// 	date: new Date(),
		// };
		// dispatch(updateMessage(editedMessage));
		setActive(false);
	}

	function handleEditClick() {
		setActive(true);
	}

	return (
		<Box sx={ContentCardCSS}>
			<Typography
				variant="h6"
				component="div"
				contentEditable={isActive}
				ref={subjectRef}
			>
				{subject}
			</Typography>
			<Typography
				variant="body1"
				component="div"
				sx={{ flexGrow: 1, overflowY: 'auto' }}
				contentEditable={isActive}
				ref={textRef}
			>
				{text}
			</Typography>
			<Stack direction="row" justifyContent="space-between">
				{isActive ? (
					<>
						<Button color="error" onClick={handleDeleteCard}>
							Deletar
						</Button>
						<Button color="success" onClick={handleSaveCard}>
							Salvar
						</Button>
					</>
				) : (
					<>
						<Button color="secondary" onClick={handleEditClick}>
							Editar
						</Button>
						<Typography variant="body2" alignSelf="center">
							{/* {format(new Date(edited_at), 'dd-MM-yyyy')} */}
						</Typography>
					</>
				)}
			</Stack>
		</Box>
	);
};

export default MessageCard;
