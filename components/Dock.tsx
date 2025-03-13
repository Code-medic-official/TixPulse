"use client";

import { useMediaQuery } from "@uidotdev/usehooks";
import Link from "next/link";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export default function Dock() {
	const is_xs_to_sm_device = useMediaQuery(
		"(width <= 640px) and (width > 425px)"
	);
	const isMobileLDevice = useMediaQuery("(width <= 425px)");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const mobileMenuVariant = {
		collapse: {
			y: 300,
			opacity: 0,
		},
		expand: {
			y: 0,
			opacity: 1,
		},
	};

	if (is_xs_to_sm_device) {
		return (
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.5, type: "spring" }}
				className="sm:text-secondary flex items-center gap-x-3 bg-secondary w-fit rounded-xl p-1 fixed bottom-2 right-1/2 translate-x-1/2"
			>
				{NAV_ITEMS.map((item, i) => (
					<NavItem key={i} {...item} position="btm" />
				))}
			</motion.div>
		);
	} else if (isMobileLDevice) {
		return (
			<motion.div
				initial={{ x: 100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.5 }}
				className="fixed bottom-12 right-3 space-y-3"
			>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							variants={mobileMenuVariant}
							initial="collase"
							animate="expand"
							exit="collapse"
							transition={{
								type: "spring",
								stiffness: 90,
								staggerChildren: 0.2,
							}}
							layout
							onClick={() => setTimeout(() => setIsOpen(false), 500)}
							className="flex flex-col gap-y-2"
						>
							{NAV_ITEMS.map((item, i) => (
								<motion.div layout variants={mobileMenuVariant} key={i}>
									<NavItem {...item} position="right" />
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
				<Button  onClick={() => setIsOpen((prev) => !prev)} asChild className="size-10 p-2">
					<motion.button whileTap={{ scale: 0.9 }}>
						<Menu size={25} strokeWidth={3} />
					</motion.button>
				</Button>
			</motion.div>
		);
	} else {
		// Desktop dock
		return (
			<motion.div
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.5, type: "spring" }}
				className="sm:text-secondary flex items-center gap-x-3 bg-secondary size-fit mx-auto rounded-xl p-1 absolute top-2 right-1/2 translate-x-1/2"
			>
				{NAV_ITEMS.map((item, i) => (
					<NavItem key={i} {...item} position="top" />
				))}
			</motion.div>
		);
	}
}

const NavItem = ({
	title,
	icon,
	href,
	position,
}: {
	title: string;
	icon: ReactNode;
	href: string;
	position: "top" | "btm" | "right";
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const pathname = usePathname();

	const upVariant = {
		visible: { y: -80, opacity: 1 },
		hidden: { y: 0, opacity: 0 },
	};

	const downVariant = {
		visible: { y: 10, opacity: 1 },
		hidden: { y: -15, opacity: 0 },
	};

	const leftVariant = {
		visible: { y: -40, x: -65, opacity: 1 },
		hidden: { y: 0, x: 100, opacity: 0 },
	};

	return (
		<Link href={href}>
			<motion.div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={cn("cursor-pointer relative")}
			>
				<motion.div
					whileHover={{ scale: 1.15 }}
					whileTap={{ scale: 0.95 }}
					className={cn(
						"text-muted-foreground !bg-muted-foreground/20 border text-xl p-2 rounded-xl",
						href === "/create-event" && "text-primary",
						pathname.startsWith(href) && "!bg-primary text-primary-foreground"
					)}
				>
					{icon}
				</motion.div>
				<AnimatePresence>
					{isHovered && (
						<motion.div
							variants={
								position === "btm"
									? upVariant
									: position === "top"
									? downVariant
									: leftVariant
							}
							initial="hidden"
							animate="visible"
							exit="hidden"
							className="font-medium text-xs text-muted-foreground bg-secondary p-1 rounded-sm shadow absolute"
						>
							{title}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</Link>
	);
};
