"use client"

import { getTaggedUsers } from "@/lib/db/actions/user.actions";
import { useEffect, useState } from "react";

export default function TagContainer({
	str,
	variant = "text",
}: {
	str: string;
	variant: "text" | "card";
}) {
	const extractTags = (str: string): string[] => {
		const regex = /@\w+/g;
		return str.match(regex) || [];
	};

	const tags = extractTags(str);

	const [taggedUsers,setTaggedUsers] = useState<iTaggedUser[]>()

	console.log(taggedUsers)

	useEffect(() => {
		const fetchTaggedUsers = async () => setTaggedUsers(await getTaggedUsers(tags))

		fetchTaggedUsers()
	},[str, tags])

	return <div>TagString</div>;
}
