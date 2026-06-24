export interface DashboardStats {
	summary: Summary;
	logs_by_status: Status[];
	logs_by_type: LogsByType[];
	logs_by_type_and_status: Status2[];
	top_vehicles_by_logs: TopVehiclesByLog[];
	top_users_by_logs: TopUsersByLog[];
	recent_logs: RecentLog[];
	media_summary: MediaSummary;
}

export interface Summary {
	total_vehicles: number;
	total_logs: number;
	logs_today: number;
	logs_this_week: number;
	logs_this_month: number;
	pending_logs: number;
	pending_incidents: number;
}

export interface Status {
	status: string;
	label: string;
	count: number;
}

export interface LogsByType {
	type: string;
	label: string;
	count: number;
}

export interface Status2 {
	type: string;
	label: string;
	statuses: Statuses;
}

export interface Statuses {
	pending: number;
	reviewed: number;
	resolved: number;
}

export interface TopVehiclesByLog {
	vehicle_id: number;
	patent: string;
	brand: string;
	model: string;
	log_count: number;
}

export interface TopUsersByLog {
	user_id: number;
	email: string;
	full_name: string;
	log_count: number;
}

export interface RecentLog {
	id: number;
	title: string;
	type: string;
	status: string;
	created_at: string;
	vehicle: Vehicle;
	created_by: CreatedBy;
	media_count: number;
}

export interface Vehicle {
	id: number;
	patent: string;
}

export interface CreatedBy {
	id: number;
	email: string;
}

export interface MediaSummary {
	total_media: number;
	photos: number;
	videos: number;
	logs_without_media: number;
}
