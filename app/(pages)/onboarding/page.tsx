import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
	const { userId, sessionClaims } = await auth();

	// if (sessionClaims?.metadata?.onboardingComplete) {
	// 	console.log("Send user to events If onboarded");
	// 	redirect("/events");
	// }

	return <div>Onboarding page</div>;
}
