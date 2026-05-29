import { Link } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import { SidebarMenu, SidebarMenuButton } from "#/components/ui/sidebar";

function SidebarLogo() {
	return (
		<SidebarMenu>
			<SidebarMenuButton size="lg" asChild>
				<Link to="/">
					<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
						<GalleryVerticalEnd className="size-4" />
					</div>
					<div className="flex flex-col gap-0.5 leading-none">
						<span className="font-medium">Menu</span>
					</div>
				</Link>
			</SidebarMenuButton>
		</SidebarMenu>
	);
}

export default SidebarLogo;
