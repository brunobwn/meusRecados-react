import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersSlice from './slices/usersSlice';
import messagesSlice from './slices/messagesSlice';
import authSlice from './slices/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['auth'],
};
const authPersistConfig = {
	key: 'auth',
	storage: storageSession,
};

const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authSlice),
	users: usersSlice,
	messages: messagesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
	devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
