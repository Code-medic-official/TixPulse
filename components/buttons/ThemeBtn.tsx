"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function ThemeBtn() {
	const { setTheme, theme } = useTheme();

	console.log(theme);

	return (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							{theme === "light" ? (
								<Sun className="h-[1.2rem] w-[1.2rem] scale-100 transition-all -rotate-90" />
							) : theme === "dark" ? (
								<Moon className="absolute h-[1.2rem] w-[1.2rem]" />
							) : (
								<Monitor className="absolute h-[1.2rem] w-[1.2rem]" />
							)}
						</Button>
					</DropdownMenuTrigger>
				</TooltipTrigger>

				<TooltipContent>Select Theme</TooltipContent>
			</Tooltip>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					<Sun />
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					<Moon />
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					<Monitor />
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
