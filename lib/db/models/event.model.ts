import { model, models, Schema } from "mongoose";

const eventSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},
		hosts: {
			type: [Schema.Types.ObjectId],
			ref: "User",
			required: true,
		},
		guests: {
			type: [Schema.Types.ObjectId],
			ref: "User",
		},
		activities: [String],
		slogan: String,
		dressCode: String,
		banner: String,
		date: {
			type: Date,
			required: true,
		},
		venue: {
			type: String,
			required: true,
		},
		location: String, // Google Maps integration,
		state: {
			type: String,
			enum: ["Draft", "Published", "Cancelled", "Expired"],
			default: "Draft",
		},
		ageLimit: Number,
	},
	{
		timestamps: true,
	}
);

export default models.Event || model("Event", eventSchema);
