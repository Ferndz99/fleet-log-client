export interface LogCreate {
	title: string;
	detail: string;
	files: File[];
	type: string;
	status: string;
}

export interface LogDetail {
	id: number;
	vehicle_id: number;
	title: string;
	detail: string;
	created_by: CreatedBy;
	created_at: string;
	media_files: MediaFile[];
	type: string;
	status: string;
}

export interface CreatedBy {
	id: number;
	email: string;
}

export interface MediaFile {
	id: number;
	file: string;
	type: string;
	type_display: string;
	vehicle_log_id: number;
}
