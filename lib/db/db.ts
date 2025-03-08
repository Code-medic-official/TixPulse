import { connect, connection } from "mongoose";

const connectDb = async (): Promise<void> => {
	const connectionState = connection.readyState;

	try {
		if (connectionState === 1) return;
		else if (connectionState === 2) {
			console.log("Db connecting📡");
		} else if (connectionState === 0) {
			const db = await connect(process.env.MONGO_URI!);
			console.log(`Db connected: ${db.connection.name}🛢️`);
		}
	} catch (error: any) {
		console.error("Db not Connect⚠️");
		process.exit(1);
	}
};

export default connectDb;
