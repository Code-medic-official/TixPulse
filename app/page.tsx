import { Button } from "@/components/ui/button";
import Lanyard from "@/components/ui/lanyard";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			{/* <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} /> */}
			Welcome to TixPulse🎉
			<SignedOut>
				<SignInButton mode="modal">
					<Button>Sign in</Button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
			<Link
				href="/events"
				className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
			>
				<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e11d48_0%,#393BB2_50%,#e11d48_100%)]" />
				<span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
					Explore events
				</span>
			</Link>
		</div>
	);
}
