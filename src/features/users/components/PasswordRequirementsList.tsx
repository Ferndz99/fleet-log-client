import { passwordRequirements } from "#/lib/constants";
import { Check, X } from "lucide-react";

interface PasswordRequirementsListProps {
    password: string;
}

function PasswordRequirementsList({ password }: PasswordRequirementsListProps) {
    return (
        <ul className="mt-2 space-y-1 text-xs">
            {passwordRequirements.map((req) => {
                const passed = req.test(password ?? "");
                return (
                    <li
                        key={req.label}
                        className={`flex items-center gap-2 transition-colors ${passed ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {passed ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <X className="h-4 w-4" />
                        )}
                        {req.label}
                    </li>
                );
            })}
        </ul>
    );
}


export default PasswordRequirementsList