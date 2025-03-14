import { getEvent } from "@/lib/db/actions/event.action";
import React from "react";

export default async function page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const event = await getEvent(id);

	console.log(event);
	return <div>{event.name}</div>;
}
