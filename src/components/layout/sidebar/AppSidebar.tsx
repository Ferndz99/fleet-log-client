import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "#/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "#/components/ui/sidebar";
import { Minus, Plus } from "lucide-react";
import SidebarLogo from "./SidebarLogo";
import SidebarUser from "./SidebarUser";
import { Link, useMatchRoute } from "@tanstack/react-router";

const user = {
	name: "shadcn",
	email: "m@example.com",
	avatar: "/avatars/shadcn.jpg",
};

// mateo

const data = {
	navMain: [
		{
			title: "General",
			url: "#",
			items: [
				{
					title: "Inicio",
					url: "/",
				},
				{
					title: "Analiticas",
					url: "#",
				},
			],
		},
		{
			title: "Operaciones",
			url: "#",
			items: [
				{
					title: "Vehiculos",
					url: "/vehicles",
				},
				{
					title: "Mantenimiento",
					url: "#",
				},
				{
					title: "Incidentes",
					url: "#",
				},
				{
					title: "Documentos",
					url: "#",
				},
			],
		},
		{
			title: "Administracion",
			url: "#",
			items: [
				{
					title: "Usuarios",
					url: "/users",
				},
				{
					title: "Invitaciones",
					url: "#",
				},
				{
					title: "Roles y Permisos",
					url: "#",
				},
			],
		},
		{
			title: "Sistema",
			url: "#",
			items: [
				{
					title: "Configuracion",
					url: "#",
				},
				{
					title: "Perfil",
					url: "/account",
				},
			],
		},
	],
};

function AppSidebar() {
	const matchRoute = useMatchRoute();

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarLogo />
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{data.navMain.map((group) => {
							const isGroupActive = group.items.some((item) =>
								matchRoute({
									to: item.url,
									fuzzy: true,
								}),
							);

							return (
								<Collapsible
									key={group.title}
									defaultOpen={isGroupActive}
									className="group/collapsible"
								>
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton>
												{group.title}

												<Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />

												<Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
											</SidebarMenuButton>
										</CollapsibleTrigger>

										{group.items?.length ? (
											<CollapsibleContent>
												<SidebarMenuSub>
													{group.items.map((item) => (
														<SidebarMenuSubItem key={item.title}>
															<SidebarMenuSubButton asChild>
																<Link
																	to={item.url}
																	activeOptions={{
																		exact: false,
																	}}
																	activeProps={{
																		className:
																			"bg-muted dark:bg-white dark:text-black text-primary font-medium",
																	}}
																>
																	{item.title}
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										) : null}
									</SidebarMenuItem>
								</Collapsible>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarUser user={user} />
			</SidebarFooter>
		</Sidebar>

		// <Sidebar>
		// 	<SidebarHeader>
		// 		<SidebarLogo />
		// 	</SidebarHeader>
		// 	<SidebarContent>
		// 		<SidebarGroup>
		// 			<SidebarMenu>
		// 				{data.navMain.map((item, index) => (
		// 					<Collapsible
		// 						key={item.title}
		// 						defaultOpen={index === 1}
		// 						className="group/collapsible"
		// 					>
		// 						<SidebarMenuItem>
		// 							<CollapsibleTrigger asChild>
		// 								<SidebarMenuButton>
		// 									{item.title}{" "}
		// 									<Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
		// 									<Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
		// 								</SidebarMenuButton>
		// 							</CollapsibleTrigger>
		// 							{item.items?.length ? (
		// 								<CollapsibleContent>
		// 									<SidebarMenuSub>
		// 										{item.items.map((item) => (
		// 											<SidebarMenuSubItem key={item.title}>
		// 												<SidebarMenuSubButton asChild>
		// 													<Link
		// 														to={item.url}
		// 														activeProps={{
		// 															className:
		// 																"bg-muted text-primary font-medium",
		// 														}}
		// 													>
		// 														{item.title}
		// 													</Link>
		// 												</SidebarMenuSubButton>
		// 											</SidebarMenuSubItem>
		// 										))}
		// 									</SidebarMenuSub>
		// 								</CollapsibleContent>
		// 							) : null}
		// 						</SidebarMenuItem>
		// 					</Collapsible>
		// 				))}
		// 			</SidebarMenu>
		// 		</SidebarGroup>

		// 		{/* <SidebarGroup>
		// 			<SidebarGroupLabel>Operaciones</SidebarGroupLabel>

		// 			<SidebarMenu>
		// 				{itemsOperations.map((item) => (
		// 					<SidebarMenuItem key={item.title}>
		// 						<SidebarMenuButton asChild>
		// 							<Link to={item.url}>
		// 								<span>{item.title}</span>
		// 							</Link>
		// 						</SidebarMenuButton>
		// 					</SidebarMenuItem>
		// 				))}
		// 			</SidebarMenu>
		// 		</SidebarGroup> */}
		// 	</SidebarContent>
		// 	<SidebarFooter>
		// 		<SidebarUser user={user} />
		// 	</SidebarFooter>
		// </Sidebar>
	);
}

export default AppSidebar;
