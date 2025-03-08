import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { PanelRightOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function RightPanelBtn() {
	return (
		<Sheet>
			<Tooltip>
				<TooltipTrigger asChild>
					<SheetTrigger asChild>
						<Button variant="secondary" size="icon">
							<PanelRightOpen />
						</Button>
					</SheetTrigger>
				</TooltipTrigger>
				<TooltipContent>Activities panel</TooltipContent>
			</Tooltip>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Activity</SheetTitle>
					<SheetDescription>Track your activity</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
