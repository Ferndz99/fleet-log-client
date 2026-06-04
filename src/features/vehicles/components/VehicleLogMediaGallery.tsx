import { Eye } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Dialog, DialogContent } from "#/components/ui/dialog";
import type { MediaFile } from "../types/vehicle";

interface Props {
	files: MediaFile[];
}

function VehicleLogMediaGallery({ files }: Props) {
	const [selectedMedia, setSelectedMedia] = useState<{
		file: string;
		type: string;
	} | null>(null);

	if (!files.length) return null;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Evidencias ({files.length})</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{files.map((media) => (
						<button
							key={media.id}
							type="button"
							className="group relative aspect-video rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-muted cursor-pointer w-full"
							onClick={() =>
								setSelectedMedia({ file: media.file, type: media.type })
							}
						>
							{media.type === "video" ? (
								<video
									src={media.file}
									className="object-cover w-full h-full"
									muted
								>
									<track kind="captions" />
								</video>
							) : (
								<img
									src={media.file}
									alt={media.type_display}
									className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
								/>
							)}
							<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								<Eye className="w-5 h-5 text-white" />
							</div>
						</button>
					))}
				</div>

				<Dialog
					open={!!selectedMedia}
					onOpenChange={() => setSelectedMedia(null)}
				>
					<DialogContent className="max-w-6xl w-full bg-black border-none p-0">
						{selectedMedia?.type === "video" ? (
							<video
								src={selectedMedia.file}
								controls
								autoPlay
								className="w-full max-h-[90vh] rounded-lg"
							>
								<track kind="captions" />
							</video>
						) : (
							<img
								src={selectedMedia?.file}
								alt="Vista ampliada"
								className="w-full max-h-[90vh] object-contain rounded-lg"
							/>
						)}
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
}

export default VehicleLogMediaGallery;
