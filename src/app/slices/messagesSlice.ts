import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Message } from '../../types/Message';
import { v4 as uuid } from 'uuid';

// Define the initial state using that type
const initialState: Message[] = [
	{
		messageId: uuid(),
		userId: 'e43680df-e6ab-4509-92ac-3c9ca6a82613',
		subject: 'Teste',
		text: 'Mensagem teste',
		createdAt: new Date().toISOString(),
		editedAt: undefined,
	},
	{
		messageId: uuid(),
		userId: 'e43680df-e6ab-4509-92ac-3c9ca6a82613---',
		subject: 'Teste 2',
		text: 'Mensagem teste 2',
		createdAt: new Date().toISOString(),
		editedAt: undefined,
	},
];

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, { payload }) => {
			state.push({
				messageId: uuid(),
				createdAt: new Date().toISOString(),
				...payload,
			});
		},
		updateMessage: (state, { payload }) => {
			const index = state.map((m) => m.messageId).indexOf(payload.messageId);
			state[index] = {
				...state[index],
				...payload,
				editedAt: new Date().toISOString(),
			};
		},
		removeMessage: (state, { payload: messageId }) => {
			state = state.filter((message) => message.messageId !== messageId);
		},
	},
});

export const { addMessage, updateMessage, removeMessage } =
	messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages;
export const selectUserMessages = (userId: string) =>
	createSelector(selectMessages, (messages) =>
		messages.filter((message) => message.userId === userId)
	);

export default messagesSlice.reducer;
