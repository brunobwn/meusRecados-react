import {
	createAsyncThunk,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { User } from '../../types/User';
import api from '../../service/ApiService';
import { TLoginSchema } from '../../types/Login';
import { TSignUpSchema } from '../../types/SignUp';

export type UserAuth = Omit<User, 'password'>;
type RegisterSchema = Omit<TSignUpSchema, 'passwordConfirm'>;
interface AuthState {
	token: string | null;
	loading: boolean;
	error: string | null;
	user: UserAuth | null;
}

const initialState: AuthState = {
	token: null,
	loading: false,
	error: null,
	user: null,
};
interface LoginSuccessPayload {
	token: string;
	user: UserAuth;
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginRequest(state: AuthState) {
			state.loading = true;
			state.error = null;
		},
		loginSuccess(state: AuthState, action: PayloadAction<LoginSuccessPayload>) {
			state.loading = false;
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.error = null;
		},
		loginFailure(state: AuthState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
		logout(state: AuthState) {
			state.token = null;
			state.user = null;
		},
		registerRequest(state: AuthState) {
			state.loading = true;
			state.error = null;
		},
		registerSuccess(state: AuthState, action: PayloadAction<LoginSuccessPayload>) {
			state.loading = false;
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.error = null;
		},
		registerFailure(state: AuthState, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
	},
	extraReducers: ({addCase}) => {
		addCase(login.fulfilled, () => {});
		addCase(registerAuth.fulfilled, () => {});
	}
});

// Action creators are generated for each case reducer function
export const { loginRequest, loginSuccess, loginFailure, logout, registerRequest, registerSuccess, registerFailure } = authSlice.actions;

export const login = createAsyncThunk(
	'login/post',
	async ({ email, password }: TLoginSchema, { dispatch }) => {
		dispatch(loginRequest());
		api.login(email, password).then((response) => {
			dispatch(loginSuccess(response.data));
		}).catch(({response}) => {
			if(response.status !== 200) {
				dispatch(loginFailure(response.data.message));
			}
		});
		return;
	}
);

export const registerAuth = createAsyncThunk(
	'register/post',
	async ({ name, email, password, avatar }: RegisterSchema, { dispatch }) => {
		dispatch(registerRequest());
		api.register(name, email, password, avatar).then((response) => {
			dispatch(registerSuccess(response.data));
		}).catch(({response}) => {
			if(response.status !== 201) {
				if(response.data.message) {
					dispatch(registerFailure(response.data.message));
				} else {
					dispatch(registerFailure('Não foi possível realizar o cadastro'));
				}
			}
		});
		return;
	}
);

export default authSlice.reducer;
