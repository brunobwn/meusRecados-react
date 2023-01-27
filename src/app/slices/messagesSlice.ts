import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState, store } from '../store';
import { Message } from '../../types/Message';
import { v4 as uuid } from 'uuid';

export const messagesAdapter = createEntityAdapter<Message>({
	selectId: (message) => message.messageId,
});

// Define the initial state using that type
// const initialState: Message[] = [
// 	{
// 		messageId: uuid(),
// 		userId: 'e43680df-e6ab-4509-92ac-3c9ca6a82613',
// 		subject: 'Teste',
// 		text: 'Mensagem teste',
// 		createdAt: new Date(),
// 		editedAt: null,
// 	},
// ];

export const messagesSlice = createSlice({
	name: 'messages',
	initialState: messagesAdapter.getInitialState(),
	reducers: {
		add: messagesAdapter.addOne,
		update: messagesAdapter.updateOne,
		remove: messagesAdapter.removeOne,
	},
});

export const { add, update, remove } = messagesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectMessages = (state: RootState) => state.messages;

const globalizedSelectors = messagesAdapter.getSelectors(
	(state) => state.messages
);
export const allMessages = globalizedSelectors.selectAll(store.getState());

export default messagesSlice.reducer;
