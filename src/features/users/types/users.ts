export interface UsersParams {
	search?: string;
	ordering?: string;
	page?: number;
}

export interface User {
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
