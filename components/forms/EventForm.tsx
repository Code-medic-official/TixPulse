"use client";

import { FileUpload } from "@/components/ui/file-upload";
import { eventZodSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divide, Loader, LocateFixedIcon, Upload } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import UserCard from "../cards/UserCard";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MotionBtn from "../ui/motion-btn";
import {
	Step,
	Stepper,
	StepperContent,
	StepperTrigger,
} from "../ui/motion-stepper";
import { Textarea } from "../ui/textarea";
import UserCombobox from "../UserCombobox";
import festivalImg from "../../public/assets/festival.svg";
import Image from "next/image";
import { uploadFiles, useUploadThing } from "@/lib/uploadthing";
import { createEvent } from "@/lib/db/actions/event.action";
import { useRouter } from "next/navigation";

export default function EventForm({
	event,
	currentUser,
}: {
	event?: iEvent;
	currentUser: iUser;
}) {
	const [hosts, setHosts] = useState<iUser[]>([currentUser]);
	const [guests, setGuests] = useState<iUser[]>([]);
	const [location, setLocation] = useState<string>();
	const [banner, setBanner] = useState<File[]>([]);

	const [isPending, startTransition] = useTransition();

	const [activeStep, setActiveStep] = useState<number>(1);

	const router = useRouter();

	const { isUploading, routeConfig, startUpload } = useUploadThing(
		"imageUploader",
		{
			onClientUploadComplete: (uploadedFiles) => {
				console.log("uploading to mongo...");
			},
			onUploadError(err) {
				toast.error(err.message);
				console.error("📤", err);
			},
			onUploadBegin() {
				console.log("📤Uploading...");
			},
		}
	);

	const form = useForm<z.infer<typeof eventZodSchema>>({
		resolver: zodResolver(eventZodSchema),
		defaultValues: {
			name: event?.name,
			description: event?.description,
			slogan: event?.slogan,
			date: event?.date,
			venue: event?.venue,
			activities: event?.activities?.join(", "),
			dressCode: event?.dressCode,
			ageLimit: event?.ageLimit,
			banner: event?.banner,
		},
	});

	useEffect(() => {
		if (banner.length < 1)
			form.setError("banner", { message: "Banner is Required!" });
		else {
			form.clearErrors("banner");
		}
	}, [banner]);

	const createEventHandler = async (
		data: z.infer<typeof eventZodSchema>,
		isDraft: boolean
	) => {
		console.log(data);

		// Start Uploading
		const uploadedFile = await toast.promise(startUpload(banner), {
			loading: "Uploading banner",
			success: "Banner uploaded👌",
			error: "Banner not uploaded❗ Please try again🙏",
		});

		startTransition(async () => {
			const newEvent = await toast.promise(
				createEvent({
					...data,
					banner: uploadedFile![0].ufsUrl,
					hosts: hosts.map((h) => h._id) as string[],
					guests: guests.map((g) => g._id) as string[],
					activities: data.activities?.split(", "),
				}),
				{
					loading: "Creating event...",
					success: "Event created successfully🎉",
					error: "Event not created😭. Please try again🙏",
				}
			);

			router.push(`/events/${newEvent._id}`);
		});

		form.reset();
	};

	const formErrorHandler = (
		error: FieldErrors<z.infer<typeof eventZodSchema>>
	) => {
		let errList: { [id: string]: string }[] = [];
		if (banner.length < 1)
			errList = [...errList, { field: "banner", msg: "Banner is required!" }];
		form.setError("banner", { message: "Banner is Required!" });

		console.error(error);

		for (const field in error) {
			errList = [...errList, { field, msg: (error[field as keyof typeof error] as any).message }];
		}

		toast((t) => (
			<div>
				<h4 className="font-medium text-destructive">
					🚨 Please fix errors in fields below👀.
				</h4>

				{errList.map(({ field, msg }, i) => (
					<p key={i} className="text-sm">
						<span className="font-medium text-destructive ">
							{field.toUpperCase()}:{" "}
						</span>
						<span>{msg}</span>
					</p>
				))}

				<div className="flex justify-end">
					<MotionBtn
						variant="ghost"
						size="sm"
						onClick={() => toast.dismiss(t.id)}
					>
						Dismiss
					</MotionBtn>
				</div>
			</div>
		));
	};

	const FORM_STEPS = [
		{
			title: "Essentials",
			body: (
				<section className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>

								<FormControl>
									<Input {...field} placeholder="Event name...." />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex flex-col sm:flex-row gap-2">
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Date</FormLabel>

									<FormControl>
										<Input {...field} type="datetime-local" />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="venue"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Venue</FormLabel>

									<FormControl>
										<Input {...field} placeholder="Event is at..." />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div>
						<Label>Google Directions✨</Label>
						<p className="mt-2 text-sm text-muted-foreground">
							Sets Google Maps location of the venue. Enable users to follow
							Google Directions to the venue.
						</p>
						<MotionBtn onClick={() => toast("Coming Soon😉")} className="mt-2">
							<span>Set Location</span>
							<LocateFixedIcon />
						</MotionBtn>
					</div>
				</section>
			),
		},
		{
			title: "Banner",
			body: (
				<section className="space-y-2">
					<Label>Event Banner✨</Label>
					<p className="text-sm text-muted-foreground mt-2">
						Snatch everyone&apos;s attention using a neat banner for your event.
					</p>

					<FileUpload
						onChange={(files: File[]) => setBanner(files)}
						selectedFiles={banner}
					/>
				</section>
			),
		},
		{
			title: "Officials",
			body: (
				<section className="space-y-4">
					<div>
						<Label>Hosts</Label>
						<p className="text-sm text-muted-foreground mt-2">
							Invite users to host your event. Hosts can help you manage the
							event.
						</p>
						{hosts.length >= 3 && (
							<p className="text-xs text-destructive font-medium">
								Limit reached❗ Click the Cards to unselect.
							</p>
						)}
						<div className="flex items-center flex-wrap gap-2 mt-2">
							<AnimatePresence>
								{hosts.map((user, i) => (
									<motion.div
										initial={{ opacity: 0, y: 100 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 100 }}
										layout
										key={i}
										onClick={() =>
											user.username !== currentUser.username
												? setHosts((prev) =>
														prev.filter(
															(_user) => _user.username !== user.username
														)
												  )
												: toast.error("Can't remove yourself as a host❗")
										}
									>
										<UserCard user={user} variant="sm" disableProfileRoute />
									</motion.div>
								))}
								{hosts.length < 3 && (
									<motion.div
										initial={{ opacity: 0, y: 100 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 100 }}
										layout
									>
										<UserCombobox
											selectAction={(value) =>
												setHosts((prev) => [...prev, value])
											}
											exclude={hosts}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					<div>
						<Label>Special guests</Label>
						<p className="text-sm text-muted-foreground mt-2">
							Which Special guests are will be at your event?
						</p>
						{guests && guests.length >= 5 && (
							<p className="text-xs text-destructive font-medium">
								Limit reached❗ Click the Cards to unselect.
							</p>
						)}
						<div className="flex items-center flex-wrap gap-2 mt-2">
							<AnimatePresence>
								{guests?.map((user, i) => (
									<motion.div
										initial={{ opacity: 0, y: 100 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 100 }}
										layout
										key={i}
										onClick={() =>
											setGuests((prev) =>
												prev.filter((_user) => _user.username !== user.username)
											)
										}
									>
										<UserCard user={user} variant="sm" disableProfileRoute />
									</motion.div>
								))}
								{guests.length < 5 && (
									<motion.div
										initial={{ opacity: 0, y: 100 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 100 }}
										layout
									>
										<UserCombobox
											selectAction={(value) =>
												setGuests((prev) => [...prev, value])
											}
											exclude={guests}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					<FormField
						control={form.control}
						name="ageLimit"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormLabel>Age Limit</FormLabel>
								<FormDescription>
									Set an age-limit for the attendants. Event will only be
									visible to eligible users
								</FormDescription>
								<FormControl>
									<Input {...field} type="number" />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</section>
			),
		},
		{
			title: "Specifics",
			body: (
				<section className="space-y-4">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>

								<FormControl>
									<Textarea
										{...field}
										rows={7}
										placeholder="So tell us about your event..."
									></Textarea>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="slogan"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Slogan</FormLabel>

								<FormControl>
									<Textarea
										{...field}
										rows={7}
										placeholder="Give your event a fancy catch-phrase...."
									></Textarea>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="activities"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Activities</FormLabel>
								<FormDescription>
									Enter a comma-separated list eg:{" "}
									<span className="italic">
										(Cooking, dancing, Crackalaking🤪...)
									</span>
								</FormDescription>
								<FormControl>
									<Textarea
										{...field}
										rows={7}
										placeholder="What are ya'll gonna do at the event..."
									></Textarea>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="dressCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>DressCode</FormLabel>

								<FormControl>
									<Textarea
										{...field}
										rows={7}
										placeholder="How do you want people to dress at your event..."
									></Textarea>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</section>
			),
		},
		{
			title: "Final Step🤩.",
			body: (
				<section className="space-y-3">
					<Label>Let the party begin😎</Label>
					<Image
						src={festivalImg}
						alt="festival-img"
						className="object-cover w-[90%] sm:w-[80%] md:w-[50%] mx-auto"
					/>

					<MotionBtn
						disabled={isUploading || isPending}
						onClick={form.handleSubmit(
							(data) => createEventHandler(data, false),
							formErrorHandler
						)}
						className="w-[80%] sm:w-[70%] md:w-[40%] flex mx-auto"
					>
						Publish
						{isUploading || isPending ? (
							<Loader className="animate-spin" />
						) : (
							<Upload />
						)}
					</MotionBtn>
				</section>
			),
		},
	];

	return (
		<Form {...form}>
			<Stepper activeStep={activeStep} setActiveStep={setActiveStep}>
				{FORM_STEPS.map(({ title, body }, i) => (
					<Step key={i} i={i + 1}>
						<StepperTrigger
							i={i + 1}
							activeStep={activeStep}
							setActiveStep={setActiveStep}
						>
							{title}
						</StepperTrigger>

						<StepperContent
							i={i + 1}
							activeStep={activeStep}
							setActiveStep={setActiveStep}
						>
							<div>{body}</div>
						</StepperContent>
					</Step>
				))}
			</Stepper>
		</Form>
	);
}
