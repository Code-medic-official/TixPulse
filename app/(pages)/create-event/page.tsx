import EventForm from "@/components/forms/EventForm";
import { getCurrentUser } from "@/lib/db/actions/user.actions";
import { CalendarDaysIcon } from "lucide-react";
import React from "react";
import { ClipLoader, HashLoader } from "react-spinners";

export default async function page() {
	const currentUser = await getCurrentUser();

	return (
		<div className="space-y-3">
			<section className="mb-4">
				<h3 className="font-semibold text-xl md:text-2xl flex items-center gap-x-2">
					<CalendarDaysIcon />
					<span>New event</span>
				</h3>
			</section>

			<section className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
				<EventForm currentUser={currentUser} />
			</section>
		</div>
	);
}
