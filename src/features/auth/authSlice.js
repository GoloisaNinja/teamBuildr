import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	uid: '',
	email: '',
	isAuthenticated: false,
	loading: true,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticate: (state, action) => {
			const { payload } = action;
			state.uid = payload.uid;
			state.email = payload.email;
			state.isAuthenticated = true;
			state.loading = false;
		},
	},
});

export const { authenticate } = authSlice.actions;
export default authSlice.reducer;
