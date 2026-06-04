import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
	fallbackTo?: string;
	label?: string;
}

function BackButton({
	fallbackTo = "/vehicles",
	label = "Volver",
}: BackButtonProps) {
	const navigate = useNavigate();

	const handleBack = () => {
		if (window.history.length > 1) {
			window.history.back();
			return;
		}

		navigate({ to: fallbackTo });
	};

	return (
		<Button variant="ghost" size={"sm"} onClick={handleBack} className="gap-2 cursor-pointer">
			<ArrowLeft className="h-4 w-4" />
			{label}
		</Button>
	);
}

export default BackButton;
