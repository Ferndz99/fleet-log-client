export interface Vehicle {
	id: number;
	patent: string;
	brand: string;
	model: string;
	year: number;
	created_at: string;
	log_count: number;
}

export interface VehiclesParams {
	search?: string;
	ordering?: string;
	page?: number;
}

export interface PaginatedResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

export interface VehicleDetail {
	id: number;
	patent: string;
	brand: string;
	model: string;
	year: number;
	created_at: string;
	logs: Log[];
}

export interface Log {
	id: number;
	title: string;
	created_by: CreatedBy;
	created_at: string;
	media_count: number;
	type: string;
	status: string;
}

export interface CreatedBy {
	id: number;
	email: string;
}

export interface VehicleCreate {
	patent: string;
	brand: string;
	model: string;
	year: number;
}
