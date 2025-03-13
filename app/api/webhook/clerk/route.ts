import {
	createUser,
	deleteUser,
	updateUser,
} from "@/lib/db/actions/user.actions";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export const POST = async (req: Request) => {
	const payload = await req.json();
	const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET!);
	const header = await headers();

	const svixId = header.get("svix-id");
	const svixSignature = header.get("svix-signature");
	const svixTimeStamp = header.get("svix-timestamp");

	if (!svixId || !svixSignature || !svixTimeStamp)
		return NextResponse.json({ msg: "Invalid request" }, { status: 400 });

	let evt: WebhookEvent;

	try {
		evt = wh.verify(JSON.stringify(payload), {
			"svix-id": svixId,
			"svix-signature": svixSignature,
			"svix-timestamp": svixTimeStamp,
		}) as WebhookEvent;
	} catch (error: any) {
		console.error("Webhook verification failed:", error);
		return NextResponse.json({ message: error }, { status: 400 });
	}

	// New User created

	if (evt.type === "user.created") {
		try {
			const {
				id: clerkId,
				username,
				image_url: imageUrl,
				first_name: fname,
				last_name: lname,
				email_addresses,
			} = evt.data;

			await createUser({
				clerkId,
				imageUrl,
				username: username!,
				fname: fname!,
				lname: lname!,
				email: email_addresses[0].email_address,
			});

			return NextResponse.json({ msg: "User Created" }, { status: 200 });
		} catch (error: any) {
			console.error(error);
			return NextResponse.json({ msg: "Create User Failed" }, { status: 500 });
		}
	}

	// ! User Updated
	if (evt.type === "user.updated") {
		try {
			const {
				email_addresses,
				first_name: fname,
				last_name: lname,
				image_url: imageUrl,
				username,
				id: clerkId,
			} = evt.data;

			await updateUser({
				clerkId,
				email: email_addresses[0].email_address,
				username: username!,
				fname: fname!,
				lname: lname!,
				imageUrl,
			});

			return NextResponse.json({ msg: "User Updated" }, { status: 200 });
		} catch (error: any) {
			console.error(error);
			return NextResponse.json({ msg: "Update User Failed" }, { status: 500 });
		}
	}

	// ! User Deleted
	if (evt.type === "user.deleted") {
		try {
			const { id: clerkId } = evt.data;
			await deleteUser(clerkId!);

			return NextResponse.json({ msg: "User Deleted" }, { status: 200 });
		} catch (error: any) {
			console.error(error);
			return NextResponse.json({ msg: "Delete User Failed" }, { status: 500 });
		}
	}
};
