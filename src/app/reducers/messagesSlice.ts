import { EditedMessage } from './../../types/Message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types/Message';
import { v4 as uuid } from 'uuid';

// Define the initial state using that type
const initialState: Message[] = [];

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, { payload }) => {
			state.unshift({
				id: uuid(),
				...payload,
			});
		},
		updateMessage: (state, { payload }: PayloadAction<EditedMessage>) => {
			const index = state.map((m) => m.id).indexOf(payload.id);
			state[index] = {
				...state[index],
				...payload,
			};
		},
		deleteMessage: (state, { payload: id }) => {
			const index = state.map((m) => m.id).indexOf(id);
			state.splice(index, 1);
		},
		setMessages: (state, { payload }: PayloadAction<Message[]>) => {
			state.splice(0, state.length, ...payload);
		}
	},
});

export const { addMessage, updateMessage, deleteMessage, setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
