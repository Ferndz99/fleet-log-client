import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function VehicleHeaderSkeleton() {
	return (
		<Card>
			<CardContent className="flex items-center justify-between p-6">
				<div className="space-y-2">
					{/* Imita el título h1 (patent) - Alto: 32px (h-8), Ancho aproximado: 140px (w-36) */}
					<Skeleton className="h-8 w-36" />

					{/* Imita el párrafo (brand model year) - Alto: 16px (h-4), Ancho aproximado: 240px (w-60) */}
					<Skeleton className="h-4 w-60" />
				</div>

				{/* Imita el Botón - Alto estándar de botón Shadcn: 40px (h-10), Ancho aproximado: 130px (w-32) */}
				<Skeleton className="h-10 w-32" />
			</CardContent>
		</Card>
	);
}
