export interface UsersParams {
	search?: string;
	ordering?: string;
	page?: number;
}

export interface UserDetail {
	id: number;
	email: string;
	is_staff: boolean;
	is_active: boolean;
	profile: Profile | null;
}

export interface Profile {
	first_name: string;
	last_name: string;
	second_last_name: string;
	full_name: string;
	rut: string;
	phone: string;
	birth_date: string;
	avatar: string;
	address: string;
	updated_at: string;
}

export interface ProfileCreate {
	first_name: string;
	last_name: string;
	second_last_name: string;
	rut: string;
	phone: string;
	birth_date: string;
	avatar: File;
	address: string;
}

export interface InvitationCreate {
	email: string;
	is_staff: boolean;
}

export interface InvitationDetail {
	id: number;
	invited_by_email: string;
	email: string;
	token_hash: string;
	status: string;
	is_staff: boolean;
	expires_at: string;
	created_at: string;
	invited_by: number;
}

export interface InvitationsParams {
	email: string;
	ordering?: string;
	page?: number;
}

export interface InvitationAccept {
	token: string;
	password: string;
	profile: Profile;
}

export interface InvitationAcceptBasic {
	password: string;
	profile: ProfileCreate;
}

export interface DetailResponse {
	detail: string;
}

export interface ValidateTokenResponse {
	email: string;
	is_staff: boolean;
	expires_at: string;
}

export interface PasswordReset {
	email: string;
}

export interface PasswordResetConfirm {
	new_password: string;
	re_new_password: string;
}
