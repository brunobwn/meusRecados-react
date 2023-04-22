import { EditedMessage } from './../../types/Message';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Message } from '../../types/Message';
import { v4 as uuid } from 'uuid';

// Define the initial state using that type
const initialState: Message[] = [
	// {
	// 	messageId: uuid(),
	// 	userId: 'e43680df-e6ab-4509-92ac-3c9ca6a82613',
	// 	subject: 'Teste',
	// 	text: 'Mensagem teste',
	// 	date: new Date(),
	// },
	// {
	// 	messageId: uuid(),
	// 	userId: 'e43680df-e6ab-4509-92ac-3c9ca6a82613',
	// 	subject: 'Teste 2',
	// 	text: 'Mensagem teste 2',
	// 	date: new Date(),
	// },
];

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, { payload }) => {
			state.push({
				messageId: uuid(),
				...payload,
			});
		},
		updateMessage: (state, { payload }: PayloadAction<EditedMessage>) => {
			const index = state.map((m) => m.messageId).indexOf(payload.messageId);
			state[index] = {
				...state[index],
				...payload,
			};
		},
		deleteMessage: (state, { payload: messageId }) => {
			const index = state.map((m) => m.messageId).indexOf(messageId);
			state.splice(index, 1);
		},
	},
});

export const { addMessage, updateMessage, deleteMessage } =
	messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages;
export const selectUserMessages = (userId: string) =>
	createSelector(selectMessages, (messages) =>
		messages.filter((message) => message.userId === userId)
	);

export default messagesSlice.reducer;
