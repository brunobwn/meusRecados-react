import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';

type UserAuth = Omit<User, 'password'>;
type Auth = { user: UserAuth; isAuthenticated: boolean };

const initialState: Auth = {
	user: {
		id: '',
		name: '',
		avatar: '',
		email: '',
	},
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signIn: (state, action: PayloadAction<UserAuth>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state = initialState;
		},
	},
});

// Action creators are generated for each case reducer function
export const { signIn, logout } = authSlice.actions;

export default authSlice.reducer;
