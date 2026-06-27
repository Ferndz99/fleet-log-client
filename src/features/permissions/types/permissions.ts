export interface Permission {
	id: number;
	name: string;
	codename: string;
	app_label: string;
	model: string;
}

export interface PermissionsParams {
	search?: string;
	ordering?: string;
	page?: number;
}

export interface Group {
	id: number;
	name: string;
	permission_count: number;
	users_count: number;
}

export interface GroupParams {
	search?: string;
	ordering?: string;
	page?: number;
}

export interface GroupDetail {
	id: number;
	name: string;
	permissions_ids: number[];
	users_ids: number[];
	permissions: Permission[];
	users: User[];
}

export interface Permission {
	id: number;
	name: string;
	codename: string;
	app_label: string;
	model: string;
}

export interface User {
	id: number;
	email: string;
	is_staff: boolean;
	is_active: boolean;
	profile: Profile;
	groups: string[];
	user_permissions: string[];
	effective_permissions: string;
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

export interface RequestAddRemovePermissions {
	permission_ids: number[];
}

export interface RequestGroup {
	name: string;
}

export interface RequestAddRemoveUsers {
	user_ids: number[];
}

export interface RequestAddGroupsToUser {
	group_ids: number[];
}
