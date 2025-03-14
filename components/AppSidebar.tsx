"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import MotionBtn from "./ui/motion-btn";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	useSidebar,
} from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function AppSidebar() {
	const { state } = useSidebar();

	const headerVariants = {
		visible: { x: 0, opacity: 1 },
		hidden: { x: -140, opacity: 0 },
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<Link href="/" className="flex items-center gap-x-2">
					<Image
						src="/assets/icon.jpg"
						alt="logo"
						width={45}
						height={45}
						priority
						className="object-cover rounded-lg"
					/>
					<AnimatePresence>
						{state === "expanded" && (
							<motion.div
								variants={headerVariants}
								initial="hidden"
								animate="visible"
								exit={{ x: -140, opacity: 0 }}
								transition={{ staggerChildren: 0.3 }}
								className="leading-1 "
							>
								<motion.h3
									variants={headerVariants}
									className="text-primary font-semibold text-xl"
								>
									TixPulse
								</motion.h3>
								<motion.p
									variants={headerVariants}
									className="text-sm text-muted-foreground truncate font-medium"
								>
									Pulse up every event🥳
								</motion.p>
							</motion.div>
						)}
					</AnimatePresence>
				</Link>
			</SidebarHeader>

			<SidebarContent>{/* <h2>Sidebar Stuff</h2> */}</SidebarContent>

			<SidebarFooter>
				<Tooltip>
					<TooltipTrigger asChild>
						<MotionBtn className="px-2 py-6 bg-gradient-to-br from-rose-600 to-orange-600 rounded-lg">
							<Link
								href="/blog"
								className="w-full p-2 bg-background rounded-md  relative group transition duration-200 text-foreground hover:bg-transparent"
							>
								Blog
							</Link>
						</MotionBtn>
					</TooltipTrigger>
					<TooltipContent>Explore our blog✨</TooltipContent>
				</Tooltip>
			</SidebarFooter>
		</Sidebar>
	);
}
