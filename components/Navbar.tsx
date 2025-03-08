import Image from "next/image";
import AppSidebar from "./AppSidebar";
import Dock from "./Dock";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ThemeBtn } from "./buttons/ThemeBtn";
import RightPanelBtn from "./buttons/RightPanelBtn";

export default function Navbar() {
	return (
		<SidebarProvider>
			<AppSidebar />

			<Tooltip>
				<TooltipTrigger asChild className="hidden md:block">
					<SidebarTrigger className="relative -left-2" />
				</TooltipTrigger>
				<TooltipContent>
					<span>Toggle sidebar</span> <code>ctrl + b</code>
				</TooltipContent>
			</Tooltip>
			<div className="w-full h-fit p-2 fixed top-0 flex items-center justify-between gap-x-3 bg-secondary/30 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none">
				<div className="flex items-center justify-center gap-x-2" >
					<Image
						src="/icon.jpg"
						alt="logo"
						width={45}
						height={45}
						priority
						className="object-cover rounded-lg md:hidden"
					/>
					<Tooltip>
						<TooltipTrigger asChild className="md:hidden block">
							<SidebarTrigger className="relative rounded-md" />
						</TooltipTrigger>
						<TooltipContent>
							<span>Toggle sidebar</span> <code>ctrl + b</code>
						</TooltipContent>
					</Tooltip>
				</div>

				<div className="flex items-center gap-x-2">
					<ThemeBtn />
					<RightPanelBtn />
				</div>
			</div>
			<Dock />
		</SidebarProvider>
	);
}
