import { z } from "zod";

export const onboardingSchema = z.object({
	fname: z
		.string({ required_error: "Firstname is required!" })
		.min(2, "Must be at least 2 characters long!"),
	lname: z
		.string({ required_error: "Lastname is required!" })
		.min(2, "Must be at least 2 characters long!"),
	dob: z.string(),
	bio: z.string().min(2, "Bio must be at least 2 characters long!").optional(),
	occupation: z.string().optional(),
});

export const eventZodSchema = z.object({
	name: z
		.string({ required_error: "Event name is required!" })
		.min(2, "Must be at least 2 characters long!")
		.max(700),
	description: z
		.string({ required_error: "Description is required!" })
		.min(25, "Must be at least 25 characters long!")
		.max(5000),
	slogan: z.string().max(300).optional(),
	dressCode: z.string().optional(),

	banner: z.any(),

	date: z.string({ required_error: "Date is required!" }),
	venue: z
		.string({ required_error: "Venue is required!" })
		.min(2, "Must be at least 2 characters long!"),
	activities: z.string().optional(),
	ageLimit: z.coerce.number().optional(),
});
