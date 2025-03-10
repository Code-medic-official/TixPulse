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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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

			<SheetContent className="p-3" >
				<div className="hidden">
					<SheetHeader>
						<SheetTitle>Activity</SheetTitle>
						<SheetDescription>Track your activity</SheetDescription>
					</SheetHeader>
				</div>
				<Tabs>
					<TabsList>
						<TabsTrigger value="My-tickets" >My tickets</TabsTrigger>
						<TabsTrigger value="Invites" >Invites</TabsTrigger>
					</TabsList>


					<TabsContent value="My-tickets" >My tickets</TabsContent>
					<TabsContent value="Invites" >Invites</TabsContent>
				</Tabs>
			</SheetContent>
		</Sheet>
	);
}
