import { z } from "zod"

export const onboardingSchema = z.object({
  dob: z.date().nullable(),
  bio: z.string().min(2).nullable(),
  occupation: z.string()
})