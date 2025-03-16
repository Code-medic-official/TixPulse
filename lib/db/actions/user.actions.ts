"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
// import { iUser } from "@/types/global";
import connectDb from "../db";
import userModel from "../models/user.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ! GEt clerk current user from mongodb
export const getCurrentUser = async (): Promise<iUser> => {
	try {
		await connectDb();

		const { userId: clerkId } = await auth();

		console.log(clerkId);

		const user = await userModel
			.findOne({ clerkId })
			.populate(["followers", "blocklist"]);

		return JSON.parse(JSON.stringify(user));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const createUser = async (newUser: iUser): Promise<void> => {
	try {
		await connectDb();

		await userModel.create(newUser);

		revalidatePath("/");
	} catch (error: any) {
		throw new Error(error);
	}
};

// Test to implement tagging
export const getTaggedUsers = async (
	tags: string[]
): Promise<iTaggedUser[]> => {
	try {
		await connectDb();

		const taggedUsers = tags.map(async (tag) => {
			const user = await userModel
				.findOne({ username: tag.split("@")[1] })
				.select(
					"-fname -lname -age -followers -blocklist -blog -dob -occupation -email"
				);

			return { username: user.username, user } as iTaggedUser;
		});

		return JSON.parse(JSON.stringify(taggedUsers));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUser = async (
	username: string,
	clerkId: string
): Promise<iUser> => {
	try {
		await connectDb();

		const user = userModel
			.findOne()
			.or([{ username }, { clerkId }])
			.populate(["followers", "blocklist"]);

		return JSON.parse(JSON.stringify(user));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUsers = async (): Promise<iUser[]> => {
	try {
		await connectDb();

		const users = await userModel
			.find()
			.populate(["followers", "blocklist"])
			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(users));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateUser = async (
	updatedUser: iUser,
	pathname?: string
): Promise<void> => {
	try {
		await connectDb();

		// ? This actually works✨🤩.
		await userModel.findOneAndUpdate(
			{ clerkId: updatedUser.clerkId },
			updatedUser
		);
		revalidatePath(pathname ?? "/profile");
	} catch (error: any) {
		throw new Error(error);
	}
};

// ? Update clerk user's metadata about the onboarding status
export const updateOnboardingStatus = async (
	status: boolean
): Promise<void> => {
	try {
		const { userId } = await auth();
		const client = await clerkClient();

		const res = await client.users.updateUser(userId!, {
			publicMetadata: {
				onboardingComplete: status,
			},
		});

		console.log("🌟 updating: ", res.publicMetadata);
		// res.publicMetadata.onboardingComplete && redirect()

		revalidatePath("/onboarding");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteUser = async (clerkId: string): Promise<void> => {
	try {
		await connectDb();

		await userModel.findOneAndDelete({ clerkId });
	} catch (error: any) {
		throw new Error(error);
	}
};
