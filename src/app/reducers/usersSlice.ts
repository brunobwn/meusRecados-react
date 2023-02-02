import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from '../../types/User';
import { v4 as uuid } from 'uuid';

// Define the initial state using that type
const initialState: User[] = [
	{
		id: 'e43680df-e6ab-4509-92ac-3c9ca6a82613---',
		name: 'Brunão',
		email: 'bruno@google.com',
		password: '12345',
		avatar: 'https://avatars.githubusercontent.com/u/108753181?v=4',
	},
];

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
			const newUser = { id: uuid(), ...action.payload };
			state.push(newUser);
		},
		removeUser: (state, action: PayloadAction<User>) => {
			state = state.filter((user) => user.id !== action.payload.id);
		},
	},
});

export const { addUser, removeUser } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
