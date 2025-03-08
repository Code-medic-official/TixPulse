import { LayoutDashboard, CreditCard, History, User } from "lucide-react";

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
