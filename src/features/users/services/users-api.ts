import type { PaginatedResponse } from "#/features/vehicles/types/vehicle";
import axiosInstance from "#/lib/axios";
import type {
	InvitationCreate,
	InvitationDetail,
	InvitationsParams,
	User,
	UsersParams,
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
