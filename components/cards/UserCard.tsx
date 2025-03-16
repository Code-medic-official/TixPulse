import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function UserCard({
	user,
	variant,
	disableProfileRoute = false,
}: {
	user: iUser;
	variant: "sm" | "md" | "base" | "lg" | "xl";
	disableProfileRoute?: boolean;
}) {
	const router = useRouter();

	if (variant === "sm")
		return (
			<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
				<Card
					onClick={() =>
						disableProfileRoute
							? null
							: router.push(`/profile/${user.username}`)
					}
					className={cn(
						"p-0 w-fit shadow cursor-pointer hover:shadow-md rounded-3xl"
					)}
				>
					<CardContent className="p-2 pr-3 flex items-center gap-2">
						<Avatar className="size-6">
							<AvatarImage src={user.imageUrl} />
							<AvatarFallback className="font-medium bg-orange-300">
								{user.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<p className="font-medium">{user.username}</p>
					</CardContent>
				</Card>
			</motion.div>
		);
	return <div></div>;
}
