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
	name: z.string().min(2).max(700),
	description: z.string().min(25).max(5000),
	slogan: z.string().max(300).optional(),
	dressCode: z.string().optional(),
	banner: z.null(),
	date: z.string(),
	venue: z.string(),
	activities: z.string().optional(),
	ageLimit: z.number().optional(),
});
