import Image from "next/image";
import Link from "next/link";
import RightPanelBtn from "./buttons/RightPanelBtn";
import { ThemeBtn } from "./buttons/ThemeBtn";
import Dock from "./Dock";
import { SidebarTrigger } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Navbar() {
	return (
		<>
			<div className="w-screen md:w-full h-[9vh] p-2 flex items-center justify-between gap-x-3 bg-secondary/30 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none">
				<div className="flex items-center justify-center gap-x-2">
					<Link href="/" className="flex items-center gap-x-1">
						<Image
							src="/assets/icon.jpg"
							alt="logo"
							width={40}
							height={40}
							priority
							className="object-cover rounded-lg md:hidden"
						/>
				
						<h3 className="hidden sm:block md:hidden text-primary font-semibold text-xl">
							TixPulse
						</h3>
					</Link>

					<Tooltip>
						<TooltipTrigger asChild>
							<SidebarTrigger className="md:!absolute  " />
						</TooltipTrigger>
						<TooltipContent>
							<span>Toggle sidebar</span> <code>ctrl + b</code>
						</TooltipContent>
					</Tooltip>
				</div>

				<div className="flex items-center gap-x-2">
					<ThemeBtn />
					<RightPanelBtn />
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
			<Dock />
		</>
	);
}
