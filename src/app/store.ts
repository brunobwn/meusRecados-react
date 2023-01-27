import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersSlice from './slices/usersSlice';
import messagesSlice from './slices/messagesSlice';
import authSlice from './slices/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['auth'],
};

const rootReducer = combineReducers({
	auth: authSlice,
	users: usersSlice,
	messages: messagesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
