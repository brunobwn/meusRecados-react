import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectUserMessages } from '../app/reducers/messagesSlice';
import { ContainerCardCSS } from '../components/MessageCard/style';
import SearchBox from '../components/SearchBox/SearchBox';
import NewMessageCard from '../components/MessageCard/NewMessageCard';
import MessageCard from '../components/MessageCard/MessageCard';

const Messages: React.FC = () => {
	const auth = useAppSelector((store) => store.auth);
	const messages = useAppSelector(selectUserMessages(auth.user.id));

	function handleSearch() {}

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
				{messages.reverse().map((message) => (
					<Grid item xs={12} sm={6} md={4} lg={3} sx={ContainerCardCSS}>
						<MessageCard data={message} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Messages;
