import { z } from "zod";

export const onboardingSchema = z.object({
	fname: z.string({ required_error: "Firstname is required!" }).min(2, "Must be at least 2 characters long!"),
	lname: z.string({ required_error: "Lastname is required!" }).min(2, "Must be at least 2 characters long!"),
	dob: z.string(),
	// dob: z.date(),
	// dob: z.coerce.date(),
	bio: z.string().min(2, "Bio must be at least 2 characters long!").optional(),
	occupation: z.string().optional(),
});
