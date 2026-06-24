import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Image, Video, FileX, type LucideIcon } from "lucide-react";

interface MediaStatProps {
    icon: LucideIcon;
    label: string;
    value: number;
}

function MediaStat({ icon: Icon, label, value }: MediaStatProps) {
    return (
        <div className="flex flex-col items-center gap-1">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <div className="text-xl font-bold">{value}</div>
            <div className="text-muted-foreground text-xs">{label}</div>
        </div>
    );
}

interface MediaSummaryCardProps {
    totalMedia: number;
    photos: number;
    videos: number;
    logsWithoutMedia: number;
}

function MediaSummaryCard({
    totalMedia,
    photos,
    videos,
    logsWithoutMedia,
}: MediaSummaryCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Multimedia adjunta</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4 pt-2">
                <MediaStat icon={Image} label="Fotos" value={photos} />
                <MediaStat icon={Video} label="Videos" value={videos} />
                <MediaStat
                    icon={FileX}
                    label="Sin adjuntos"
                    value={logsWithoutMedia}
                />
            </CardContent>
            <p className="text-muted-foreground px-6 pb-4 text-xs">
                {totalMedia} archivos en total
            </p>
        </Card>
    );
}

export default MediaSummaryCard;