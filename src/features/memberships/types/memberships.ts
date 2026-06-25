export interface MembershipsParams {
	search?: string;
	ordering?: string;
	page?: number;
}


export interface Membership {
	id: number;
	user_email: string;
	is_active: boolean;
	invited_at: string;
	joined_at: string;
	user: number;
}
