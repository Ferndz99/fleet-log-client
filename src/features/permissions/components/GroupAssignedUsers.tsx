import { Checkbox } from "#/components/ui/checkbox"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from "#/components/ui/field"
import { Separator } from "#/components/ui/separator"

import type { UserDetail } from "#/features/users/types/users"
import type { User } from "../types/permissions"

interface GroupAssignedUsersProps {
    users: User[]
    selectedUsers: number[]
    onToggleUser: (userId: number, checked: boolean) => void
}

export function GroupAssignedUsers({
    users,
    selectedUsers,
    onToggleUser,
}: GroupAssignedUsersProps) {
    if (!users.length) {
        return null
    }

    return (
        <div className="space-y-2">
            <h4 className="font-medium">
                Usuarios del grupo ({users.length})
            </h4>

            {users.map((user) => (
                <FieldLabel key={user.id}>
                    <Field orientation="horizontal">
                        <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={(checked) =>
                                onToggleUser(user.id, !!checked)
                            }
                        />

                        <FieldContent>
                            <FieldTitle>
                                {user.profile?.full_name} - {user.profile?.rut}
                            </FieldTitle>

                            <FieldDescription>
                                {user.email}
                            </FieldDescription>
                        </FieldContent>
                    </Field>
                </FieldLabel>
            ))}
            <Separator/>
        </div>
    )
}