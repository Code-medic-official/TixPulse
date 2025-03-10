import { LayoutDashboard, CreditCard, History, User, Plus } from "lucide-react";

export const NAV_ITEMS = [
	{
		title: "Events",
		href: "/events",
		icon: <LayoutDashboard />,
	},
	{
		title: "Checkout",
		href: "/checkout",
		icon: <CreditCard />,
	},
	{
		title: "Create event✨",
		href: "/create-event",
		icon: <Plus strokeWidth={4} />,
		// icon: <Plus stroke="#e11d48" strokeWidth={4} />,
	},
	{
		title: "History",
		href: "/history",
		icon: <History />,
	},
	{
		title: "Profile",
		href: "/profile",
		icon: <User />,
	},
];
