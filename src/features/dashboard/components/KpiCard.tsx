import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import { cn } from "#/lib/utils";
import type { LucideIcon } from "lucide-react";


interface KpiCardProps {
	title?: string;
	value?: string | number;
	description?: string;
	icon?: LucideIcon;
	trend?: {
		value: number;
		label?: string;
	};
	variant?: "default" | "alert";
	isLoading: boolean;
}

function KpiCard({
	title,
	value,
	description,
	icon: Icon,
	trend,
	variant = "default",
	isLoading
}: KpiCardProps) {


	if (isLoading) {
		return (
			<Card className={cn(variant === "alert" && "border-destructive")}>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">
						<Skeleton className="h-4 w-24" />
					</CardTitle>


					<Skeleton className="h-4 w-4 rounded" />

				</CardHeader>

				<CardContent>
					<div className="text-2xl font-bold">
						<Skeleton className="h-8 w-20" />
					</div>

					<div className="mt-2 space-y-2">
						<Skeleton className="h-3 w-32" />
					</div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className={cn(variant === "alert" && "border-destructive")}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title || "de"}</CardTitle>
				{Icon && (
					<Icon
						className={cn(
							"h-4 w-4 text-muted-foreground",
							variant === "alert" && "text-destructive",
						)}
					/>
				)}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				{(description || trend) && (
					<p className="text-muted-foreground text-sm">
						{trend && (
							<span
								className={cn(
									trend.value >= 0 ? "text-emerald-600" : "text-destructive",
								)}
							>
								{trend.value >= 0 ? "+" : ""}
								{trend.value}%{" "}
							</span>
						)}
						{trend?.label ?? description}
					</p>
				)}
			</CardContent>
		</Card>
	);
}

export default KpiCard;
