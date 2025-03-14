"use client";

import { onboardingSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader, UserCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MotionBtn from "../ui/motion-btn";
import { Textarea } from "../ui/textarea";
import { useTransition } from "react";
import {
	updateOnboardingStatus,
	updateUser,
} from "@/lib/db/actions/user.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OnboardingForm({ user }: { user: iUser }) {
	const [isLoading, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof onboardingSchema>>({
		resolver: zodResolver(onboardingSchema),
		defaultValues: {
			fname: user.fname ?? "",
			lname: user.lname ?? "",
			bio: user.bio ?? "",
			dob: user.dob,
			occupation: user.occupation ?? "",
		},
	});

	const submitHandler = (data: z.infer<typeof onboardingSchema>) => {
		startTransition(async (): Promise<void> => {
			await updateUser({ ...user, ...data }, "/onboarding");
			await toast.promise(updateOnboardingStatus(true), {
				loading: "Setting up profile...",
				success: "Onboarding complete!🎉",
				error: "Onboarding failed😢.Please try again 🙏",
			});
			router.push("/events");
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(submitHandler, (err) => console.error(err))}
				className="space-y-4 border-0 sm:border rounded-lg p-4"
			>
				<div className="mb-7">
					<Label className="text-xl md:text-2xl font-Medium">
						<UserCircle />
						Onboarding
					</Label>
					<p className="text-sm text-muted-foreground">
						Complete your profile to continue🤗.
					</p>
				</div>

				<div className="flex items-center gap-3">
					<FormField
						control={form.control}
						name="fname"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>First name</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder={user.fname ?? "First name..."}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lname"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Last name</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder={user.lname ?? "Last name..."}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="occupation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Occupation</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder={user.occupation ?? "Occupation..."}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									rows={3}
									cols={2}
									placeholder={user.bio ?? "Enter your bio..."}
								></Textarea>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="dob"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Date of birth</FormLabel>

							<FormControl>
								<Input type="date" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<MotionBtn disabled={isLoading}>
					<span>Complete onboarding</span>
					{isLoading ? (
						<Loader size={24} className="animate-spin" />
					) : (
						<ArrowRight />
					)}
				</MotionBtn>
			</form>
		</Form>
	);
}
