import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './slices/usersSlice';
import messagesSlice from './slices/messagesSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		users: usersSlice,
		messages: messagesSlice,
	},
	// devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
