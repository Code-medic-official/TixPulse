import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/api/webhook/clerk"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
	const { userId, sessionId, sessionClaims, redirectToSignIn } = await auth();

	// Protect all routes except Public routes
	// if (!isPublicRoute(req)) {
	// 	await auth.protect();
	// }
	console.log(
		"🤑",
		userId,
		sessionId,
		sessionClaims?.metadata?.onboardingComplete
	);

	// If user isn't signed in and the route is private, redirect to sign-in
	if (!userId && !isPublicRoute(req)) {
		console.log(
			"👉If the user isn't signed in and the route is private, redirect to sign-in"
		);
		return redirectToSignIn({ returnBackUrl: req.url });
	}

	// For users visiting /onboarding, don't try to redirect
	if (userId && isOnboardingRoute(req)) return NextResponse.next();

	// ON Protected Routes Catch users (signed in) who do not have `onboardingComplete: true` in their publicMetadata
	// Redirect them to the /onboading route to complete onboarding
	if (
		userId &&
		!isPublicRoute(req) &&
		!sessionClaims?.metadata?.onboardingComplete
	) {
		console.log(
			"⭐ Redirect them to the /onboading route to complete onboarding"
		);
		const onboadingUrl = new URL("/onboarding", req.url);
		return NextResponse.redirect(onboadingUrl);
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
