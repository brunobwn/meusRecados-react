import { EditedMessage } from './../../types/Message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types/Message';

const initialState: Message[] = [];

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, { payload }) => {
			state.unshift(payload);
		},
		updateMessage: (state, { payload }: PayloadAction<EditedMessage>) => {
			const index = state.map((m) => m.id).indexOf(payload.id);
			state[index] = {
				...state[index],
				...payload,
				edited_at: new Date().toISOString()
			};
		},
		toggleStatusMessage: (state, { payload:id }) => {
			const index = state.map((m) => m.id).indexOf(id);
			state[index] = {
				...state[index],
				is_active: !state[index].is_active,
			};
		},
		setMessages: (state, { payload }: PayloadAction<Message[]>) => {
			state.splice(0, state.length, ...payload);
		}
	},
});

export const { addMessage, updateMessage, toggleStatusMessage, setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
