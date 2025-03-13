"use server";

// import { iUser } from "@/types/global";
import connectDb from "../db";
import userModel from "../models/user.model";
import { revalidatePath } from "next/cache";

export const createUser = async (newUser: iUser): Promise<void> => {
	try {
		await connectDb();

		await userModel.create(newUser);

		revalidatePath("/");
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

export const updateUser = async (
	updatedUser: iUser,
	pathname?: string
): Promise<void> => {
	try {
		await connectDb();

		// ! test this out
		await userModel.findOneAndUpdate(
			{ clerkId: updatedUser.clerkId },
			updatedUser
		);
		revalidatePath(pathname ?? "/profile");
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
