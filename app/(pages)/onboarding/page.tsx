import OnboardingForm from "@/components/forms/OnboardingForm";
import { getCurrentUser } from "@/lib/db/actions/user.actions";
import { clerkClient, currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
	const currentUser_ = await getCurrentUser();

	// ? Redirect to events page if onboarding is complete
	if ((await currentUser())!.publicMetadata.onboardingComplete)
		redirect("/events");

	return (
		<div className="py-5">
			<section className="w-screen sm:w-[90vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] mx-auto">
				<OnboardingForm user={currentUser_} />
			</section>
		</div>
	);
}
