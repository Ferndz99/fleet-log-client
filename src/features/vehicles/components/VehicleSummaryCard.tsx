import { Card, CardContent } from "#/components/ui/card"
import { Car } from "lucide-react"
import type { VehicleDetail } from "../types/vehicle"
import { Skeleton } from "#/components/ui/skeleton";


interface VehicleSummaryCardProps {
    data?: VehicleDetail;
    isLoading?: boolean
}

function VehicleSummaryCard({ data, isLoading }: VehicleSummaryCardProps) {
    return (

        <Card className="w-full max-w-xl mx-auto mb-4 shadow-sm mt-12">
            <CardContent className="py-4 flex items-center gap-4">
                <div className="bg-muted rounded-md p-3">
                    <Car className="w-6 h-6 text-muted-foreground" />
                </div>
                {isLoading ? (
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                ) : (
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-lg tracking-widest">
                            {data?.patent}
                        </span>
                        <div className="flex gap-3 text-sm text-muted-foreground">
                            <span>{data?.brand} {data?.model}</span>
                            <span>·</span>
                            <span>{data?.year}</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>


        // <Card className="w-full max-w-xl mx-auto mb-4 shadow-sm mt-12">
        //     <CardContent className="py-4 flex items-center gap-4">
        //         <div className="bg-muted rounded-md p-3">
        //             <Car className="w-6 h-6 text-muted-foreground" />
        //         </div>
        //         <div className="flex flex-col gap-1">
        //             <span className="font-semibold text-lg tracking-widest">
        //                 {data.patent}
        //             </span>
        //             <div className="flex gap-3 text-sm text-muted-foreground">
        //                 <span>{data.brand} {data.model}</span>
        //                 <span>·</span>
        //                 <span>{data.year}</span>
        //             </div>
        //         </div>
        //     </CardContent>
        // </Card>
    )
}

export default VehicleSummaryCard