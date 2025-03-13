import React from "react";

export default function page({ event }: { event?: iEvent }) {
	console.log(event)
	return <div>New Event</div>;
}
