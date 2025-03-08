import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { DockBtm } from "@/components/ui/dock-top";
import { NAV_ITEMS } from "@/constants";

const poppinsFont = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
	style: ["normal", "italic"],
});

export const metadata: Metadata = {
	title: "TixPulse",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className={`${poppinsFont.className} antialiased bg-background text-foreground`}
		>
			<ScrollArea className="h-screen">
				<nav>
					<Navbar />
				</nav>
				<main>{children}</main>

				<Scrollbar />
			</ScrollArea>
		</div>
	);
}
