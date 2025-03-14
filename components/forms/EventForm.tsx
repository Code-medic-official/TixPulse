"use client";

import { eventZodSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function EventForm({
	event,
	currentUser,
}: {
	event?: iEvent;
	currentUser: iUser;
}) {

  const [hosts, setHosts] = useState<string[]>()

	const form = useForm<z.infer<typeof eventZodSchema>>({
		resolver: zodResolver(eventZodSchema),
		defaultValues: {
			name: event?.name ?? "",
			description: event?.description ?? "",
			slogan: event?.slogan ?? "",
			date: event?.date ?? "",
			venue: event?.venue ?? "",
			activities: event?.activities,
			dressCode: event?.dressCode ?? "",
			ageLimit: event?.ageLimit,
			banner: event?.banner ?? "",
		},
	});

	return <div>EventForm</div>;
}
