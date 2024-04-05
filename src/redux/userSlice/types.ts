export interface UserSliceState {
	name: string;
	email: string;
	isAuth: boolean;
}

export interface LoginPayloadAction {
	name: string;
	email: string;
}