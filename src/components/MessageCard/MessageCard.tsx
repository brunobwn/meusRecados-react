import { useRef, useState } from 'react';
import { Box, Typography, Stack, Button, makeStyles } from '@mui/material';
import { ContentCardCSS } from './style';
import { toggleStatusMessage, updateMessage } from '../../app/reducers/messagesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Message } from '../../types/Message';
import { format } from 'date-fns';
import api from '../../service/ApiService';

interface MessageCardProps {
	data: Message;
}

const MessageCard = ({ data }: MessageCardProps) => {
	const [isEditing, setEditing] = useState(false);
	const subjectRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();

	const { id, subject, text, is_active, edited_at } = data;

	const firstClick = { subject: true, text: true };

	async function handleToggleStatusMessage() {
		const res = await api.toggleStatusMessage(id);
		if (res.status != 204) {
			console.log('erro ao trocar status mensagem');
		}
		setEditing(false);
		dispatch(toggleStatusMessage(id));
	}

	async function handleSaveCard() {
		if (!subjectRef.current!.innerText || !textRef.current!.innerText) {
			alert('todos os campos devem ser preenchidos');
			return;
		}
		const editedMessage = {
			id,
			subject: subjectRef.current!.innerText,
			text: textRef.current!.innerText,
		};
		const res = await api.updateMessage(editedMessage);
		if (res.status != 204) {
			console.log('erro ao atualizar mensagem');
		}
		dispatch(updateMessage(editedMessage));
		setEditing(false);
	}

	function handleEditClick() {
		setEditing(true);
	}

	return (
		<Box sx={[ContentCardCSS, !is_active && {opacity: 0.5}]}>
			<Typography
				variant="h6"
				component="div"
				contentEditable={isEditing}
				suppressContentEditableWarning={true}
				ref={subjectRef}
			>
				{subject}
			</Typography>
			<Typography
				variant="body1"
				component="div"
				sx={{ flexGrow: 1, overflowY: 'auto' }}
				contentEditable={isEditing}
				suppressContentEditableWarning={true}
				ref={textRef}
			>
				{text}
			</Typography>
			<Stack direction="row" justifyContent="space-between">
				{isEditing ? (
					<>
						<Button color="error" onClick={handleToggleStatusMessage}>
							{is_active ? 'Arquivar' : 'Desarquivar'}
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
							{format(new Date(edited_at), 'dd-MM-yyyy')}
						</Typography>
					</>
				)}
			</Stack>
		</Box>
	);
};

export default MessageCard;
