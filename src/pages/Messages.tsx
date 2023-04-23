import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setMessages } from '../app/reducers/messagesSlice';
import { ContainerCardCSS } from '../components/MessageCard/style';
import SearchBox from '../components/SearchBox/SearchBox';
import NewMessageCard from '../components/MessageCard/NewMessageCard';
import MessageCard from '../components/MessageCard/MessageCard';
import { GridMotion } from '../components/MotionMaterial';
import { Message } from '../types/Message';
import api from '../service/ApiService';

const Messages: React.FC = () => {
	const dispatch = useAppDispatch();
	const messages: Message[] = useAppSelector((store) => store.messages);

	useEffect(() => {
		api.getAllMessages().then(res => res.data).then(data => {
			dispatch(setMessages(Object.values(data)));
		}).catch(({response}) => {
			// console.log(response);
		});
	}, []);
	return (
		<Container>
			<Typography variant="h4" color="white" mt={2}>
				Mensagens
			</Typography>
			<SearchBox />
			<Grid container mt={2} spacing={2}>
				<Grid item xs={12} sm={6} md={4} lg={3} sx={ContainerCardCSS}>
					<NewMessageCard />
				</Grid>
				{messages.map((message: Message) => (
					<GridMotion
						item
						xs={12}
						sm={6}
						md={4}
						lg={3}
						sx={ContainerCardCSS}
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ type: 'spring', duration: 0.5 }}
						exit={{ scale: 0, opacity: 0 }}
						key={message.id}
					>
						<MessageCard data={message} />
					</GridMotion>
				))}
			</Grid>
		</Container>
	);
};

export default Messages;
