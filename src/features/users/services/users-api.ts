import type { PaginatedResponse } from "#/features/vehicles/types/vehicle";
import axiosInstance from "#/lib/axios";
import type {
	DetailResponse,
	InvitationAccept,
	InvitationAcceptBasic,
	InvitationCreate,
	InvitationDetail,
	InvitationsParams,
	User,
	UsersParams,
	ValidateTokenResponse,
} from "../types/users";

export async function fetchUsers(
	params: UsersParams,
): Promise<PaginatedResponse<User>> {
	const { data } = await axiosInstance.get("api/v1/users/", {
		params: {
			search: params.search || undefined,
			ordering: params.ordering || undefined,
			page: params.page && params.page > 1 ? params.page : undefined,
		},
	});

	return data;
}

export async function createInvitation(
	payload: InvitationCreate,
): Promise<InvitationDetail> {
	const { data } = await axiosInstance.post("api/v1/invitations/", payload);

	return data;
}

export async function fetchUser(userId: number): Promise<User> {
	const { data } = await axiosInstance.get(`api/v1/users/${userId}/`);
	return data;
}

export async function fetchInvitations(
	params: InvitationsParams,
): Promise<PaginatedResponse<InvitationDetail>> {
	const { data } = await axiosInstance.get("api/v1/invitations/", {
		params: {
			email: params.email || undefined,
			ordering: params.ordering || undefined,
			page: params.page && params.page > 1 ? params.page : undefined,
		},
	});

	return data;
}

export async function acceptInvitation(
	payload: InvitationAcceptBasic,
	token: string,
): Promise<DetailResponse> {
	const formData = new FormData();
	formData.append("token", token);
	formData.append("password", payload.password);
	formData.append("profile.first_name", payload.profile.first_name);
	formData.append("profile.last_name", payload.profile.last_name);
	formData.append("profile.second_last_name", payload.profile.second_last_name);
	formData.append("profile.rut", payload.profile.rut);
	formData.append("profile.phone", payload.profile.phone);
	formData.append("profile.birth_date", payload.profile.birth_date);
	formData.append("profile.address", payload.profile.address);

	if (payload.profile.avatar) {
		formData.append("profile.avatar", payload.profile.avatar);
	}

	const { data } = await axiosInstance.post("api/v1/invitations/accept/", formData);
	return data;
}

export async function validateInvitationToken(
	token: string,
): Promise<ValidateTokenResponse> {
	const { data } = await axiosInstance.get("api/v1/invitations/validate/", {
		params: {
			token,
		},
	});

	return data;
}
