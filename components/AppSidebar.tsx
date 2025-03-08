"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	useSidebar,
} from "./ui/sidebar";

export default function AppSidebar() {
	const { state } = useSidebar();

	const headerVariants = {
		visible: { x: 0, opacity: 1 },
		hidden: { x: -140, opacity: 0 },
	};

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<div className="flex items-center gap-x-2">
					<Image
						src="/icon.jpg"
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
				</div>
			</SidebarHeader>

			<SidebarContent>
				<h2>Sidebar Stuff</h2>
			</SidebarContent>

			<SidebarFooter></SidebarFooter>
		</Sidebar>
	);  
}
