import type { UserDetail } from "#/features/users/types/users";

export function getInitials(user: UserDetail | null) {
	return user?.profile
		? `${user?.profile.first_name[0]}${user?.profile.last_name[0]}`.toUpperCase()
		: user?.email[0].toUpperCase();
}
