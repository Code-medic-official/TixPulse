import { models, model, Schema } from "mongoose";

const userSchema = new Schema(
	{
		clerkId: {
			type: String,
			required: true,
			unique: true,
			immutable: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		fname: {
			type: String,
			required: true,
		},
		lname: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
			default: "No event is gonna pass me with TixPulse🤩",
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		onboarded: {
			type: Boolean,
			default: false,
		},
		followers: {
			type: [Schema.Types.ObjectId],
			ref: "User",
		},
		blocklist: {
			type: [Schema.Types.ObjectId],
			ref: "User",
		},
	},
	{ timestamps: true }
);

export default models?.User || model("User", userSchema);
