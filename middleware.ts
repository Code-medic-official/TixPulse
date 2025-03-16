import {
	clerkMiddleware,
	createRouteMatcher,
	currentUser,
	User,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/api/webhook/clerk", "/api/uploadthing"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
	const { userId, sessionClaims, redirectToSignIn } = await auth();
	const publicMetadata = sessionClaims?.metadata;

	console.log("🗝️", publicMetadata);

	// ? Protect private Routes.
	if (!isPublicRoute(req)) await auth.protect();

	// ? For users visiting /onboarding, don't try to redirect
	if (userId && isOnboardingRoute(req)) return NextResponse.next();

	// ON Protected Routes Catch users (signed in) who do not have `onboardingComplete: true` in their publicMetadata
	// Redirect them to the /onboarding route to complete onboarding
	if (userId && !isPublicRoute(req) && !publicMetadata?.onboardingComplete) {
		console.log("⭐ Redirect them to the /onboarding ");
		const onboarding = new URL("/onboarding", req.url);
		return NextResponse.redirect(onboarding);
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
