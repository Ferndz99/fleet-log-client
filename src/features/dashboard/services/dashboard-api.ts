import axiosInstance from "#/lib/axios";
import type { DashboardStats } from "../types/dashboard";

export async function fetchDashboardStats(): Promise<DashboardStats> {
	const { data } = await axiosInstance.get("api/v1/dashboard/");
	return data;
}
