import type { PaginatedResponse } from "#/features/vehicles/types/vehicle";
import axiosInstance from "#/lib/axios";
import type { Membership, MembershipsParams } from "../types/memberships";

export async function fetchMemberships(
	params: MembershipsParams,
): Promise<PaginatedResponse<Membership>> {
	const { data } = await axiosInstance.get("api/v1/memberships/", {
		params: {
			search: params.search || undefined,
			ordering: params.ordering || undefined,
			page: params.page && params.page > 1 ? params.page : undefined,
		},
	});

	return data;
}

export async function fetchMembership(
	membershipId: number,
): Promise<Membership> {
	const { data } = await axiosInstance.get(
		`api/v1/memberships/${membershipId}/`,
	);
	return data;
}

export async function activateMembership(
	membershipId: number,
): Promise<Membership> {
	const { data } = await axiosInstance.post(
		`api/v1/memberships/${membershipId}/activate/`,
	);
	return data;
}

export async function deactivateMembership(
	membershipId: number,
): Promise<Membership> {
	const { data } = await axiosInstance.post(
		`api/v1/memberships/${membershipId}/deactivate/`,
	);
	return data;
}
