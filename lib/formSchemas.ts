import { z } from "zod"

export const onboardingSchema = z.object({
  bio: z.string().minLength(2).nullable(),
  dob: z.date().nullable(),
})