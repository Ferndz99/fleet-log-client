import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";
import { Skeleton } from "#/components/ui/skeleton";

function VehicleLogDetailSkeleton() {
	return (
		<div>
			<Card className="w-full mx-auto shadow-md border-zinc-200 dark:border-zinc-800">
				{/* HEADER SKELETON */}
				<CardHeader className="space-y-3">
					<div className="flex items-start justify-between gap-4">
						<div className="space-y-2 w-full">
							{/* ID del vehículo ficticio */}
							<Skeleton className="h-4 w-32" />
							{/* Título ficticio */}
							<Skeleton className="h-6 w-3/4" />
						</div>
						{/* Badges ficticios */}
						<div className="flex gap-2 shrink-0">
							<Skeleton className="h-6 w-16" />
							<Skeleton className="h-6 w-20" />
						</div>
					</div>
				</CardHeader>

				{/* CONTENT SKELETON */}
				<CardContent className="space-y-4">
					{/* Líneas de texto del detalle */}
					<div className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
					</div>

					{/* Galería de imágenes ficticia */}
					<div className="pt-2">
						<Skeleton className="h-3 w-24 mb-2" />{" "}
						{/* Texto "Archivos adjuntos" */}
						<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
							<Skeleton className="aspect-video w-full rounded-md" />
							<Skeleton className="aspect-video w-full rounded-md" />
						</div>
					</div>
				</CardContent>

				

				{/* FOOTER SKELETON */}
				<CardFooter className="bg-zinc-50/50 dark:bg-zinc-900/30 py-3 flex items-center justify-between gap-4">
					{/* Avatar + Email ficticio */}
					<div className="flex items-center gap-2">
						<Skeleton className="h-6 w-6 rounded-full" />
						<Skeleton className="h-4 w-36" />
					</div>
					{/* Fecha ficticia */}
					<Skeleton className="h-4 w-28" />
				</CardFooter>
			</Card>
		</div>
	);
}

export default VehicleLogDetailSkeleton;
