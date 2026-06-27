import type { PaginatedResponse } from "#/features/vehicles/types/vehicle";
import axiosInstance from "#/lib/axios";
import type {
	Group,
	GroupDetail,
	GroupParams,
	Permission,
	PermissionsParams,
	RequestAddRemovePermissions,
	RequestAddRemoveUsers,
	RequestGroup,
} from "../types/permissions";

export async function fetchPermissions(
	params?: PermissionsParams,
): Promise<Permission[]> {
	const { data } = await axiosInstance.get("api/v1/permissions/", {
		params: {
			search: params?.search || undefined,
			ordering: params?.ordering || undefined,
			page: params?.page && params?.page > 1 ? params?.page : undefined,
		},
	});

	return data;
}

export async function fetchGroups(
	params: GroupParams,
): Promise<PaginatedResponse<Group>> {
	const { data } = await axiosInstance.get("api/v1/groups/", {
		params: {
			search: params.search || undefined,
			ordering: params.ordering || undefined,
			page: params.page && params.page > 1 ? params.page : undefined,
		},
	});

	return data;
}

export async function fetchGroup(groupId: number): Promise<GroupDetail> {
	const { data } = await axiosInstance.get(`api/v1/groups/${groupId}/`);
	return data;
}

export async function addPermissionToGroup(
	groupId: number,
	payload: RequestAddRemovePermissions,
): Promise<void> {
	await axiosInstance.post(
		`api/v1/groups/${groupId}/add_permissions/`,
		payload,
	);
}

export async function removePermissionToGroup(
	groupId: number,
	payload: RequestAddRemovePermissions,
): Promise<void> {
	await axiosInstance.post(
		`api/v1/groups/${groupId}/remove_permissions/`,
		payload,
	);
}

export async function createGroup(payload: RequestGroup): Promise<Group> {
	const { data } = await axiosInstance.post("api/v1/groups/", payload);
	return data;
}

export async function addUserToGroup(
	groupId: number,
	payload: RequestAddRemoveUsers,
): Promise<void> {
	await axiosInstance.post(`api/v1/groups/${groupId}/add_users/`, payload);
}

export async function setPermissions(
	groupId: number,
	payload: RequestAddRemovePermissions,
): Promise<void> {
	await axiosInstance.post(
		`api/v1/groups/${groupId}/set_permissions/`,
		payload,
	);
}

export async function setUsers(
	groupId: number,
	payload: RequestAddRemoveUsers,
): Promise<void> {
	await axiosInstance.post(`api/v1/groups/${groupId}/set_users/`, payload);
}
