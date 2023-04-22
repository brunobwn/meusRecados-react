import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersSlice from './reducers/usersSlice';
import messagesSlice from './reducers/messagesSlice';
import authSlice from './reducers/authSlice';

const rootReducer = combineReducers({
	auth: authSlice,
	users: usersSlice,
	messages: messagesSlice,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
