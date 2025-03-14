"use server";

import { revalidatePath } from "next/cache";
import connectDb from "../db";
import eventModel from "../models/event.model";

export const createEvent = async (newEvent: iEvent): Promise<void> => {
	try {
		await connectDb();

		await eventModel.create(newEvent);

		revalidatePath("/events");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUpcomingEvents = async (): Promise<iEvent[]> => {
	try {
		await connectDb();

		const upComingEvents = await eventModel
			.find({ state: "Published" })
			.populate(["hosts", "guests"])
			.sort("desc");

		return JSON.parse(JSON.stringify(upComingEvents));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getEvent = async (eventId: string): Promise<iEvent> => {
	try {
		await connectDb();

		const event = await eventModel
			.findById(eventId)
			.populate(["hosts", "guests"]);

		return JSON.parse(JSON.stringify(event));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateEvent = async (
	updatedEvent: iEvent,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await eventModel.findByIdAndUpdate(updatedEvent._id, updatedEvent);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteEvent = async (
	eventId: string,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await eventModel.findByIdAndDelete(eventId);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
