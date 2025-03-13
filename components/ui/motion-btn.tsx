"use client";

/**
 * ? My custom shadCn Btn with motion intergrated.
 */

import React, { ComponentProps, ReactNode } from "react";
import { Button } from "./button";
import { motion } from "motion/react";

export default function MotionBtn({
	children,
	// className,
	// onClick,
	...props
}: ComponentProps<typeof Button> & { children: ReactNode }) {
	return (
		<Button {...props} asChild>
			<motion.button
				whileHover={{ scale: 1.05, skewY: 2 }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: "spring" }}
			>
				{children}
			</motion.button>
		</Button>
	);
}
