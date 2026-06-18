import type { PaginatedResponse } from "#/features/vehicles/types/vehicle";
import axiosInstance from "#/lib/axios";
import type { User, UsersParams } from "../types/users";

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
