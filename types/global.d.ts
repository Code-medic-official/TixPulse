export {};

declare module "*.glb";
declare module "*.png";

declare module "meshline" {
	export const MeshLineGeometry: any;
	export const MeshLineMaterial: any;
}

declare global {
	// Models Interfaces
	interface iUser {
		_id?: string;
		clerkId: string;
		username: string;
		imageUrl?: string;
		email: string;
		followers?: (string | iUser)[];
		blocklist?: (string | iUser)[];

		// ! Onboarding fields
		fname?: string;
		lname?: string;
		bio?: string;
		dob?: string;
		occupation?: string;
		createdAt?: string;
		updatedAt?: string;
	}

	interface iEvent {
		_id?: string;
		name: string;
		slogan?: string;
		description: string;
		hosts: (string | iUser)[];
		guests?: (string | iUser)[];
		banner?: string;
		date: string;
		venue: string; // ? site/hall/building
		location?: string; // 🤔 Google maps
		state: "Draft" | "Published" | "Cancelled" | "Expired";
		ageLimit?: number;
		createdAt: string;
		updatedAt: string;

		activities?: string | string[];
		dressCode?: string;
	}

	interface iTicketTier {
		_id: string;
		event: string | iEvent;
		name: string;
		description: string;
		price: number;
		banner?: string; // Used in respective ticket design
		quantity: number;
		createdAt: string;
		updatedAt: string;
	}

	interface iTicket {
		_id: string;
		tier: string | iTicketTier;
		owner: string | iUser;
		status: "Valid" | "Used" | "Refunded" | "Cancelled" | "Expired";
		paymentId?: string;
		createdAt: string;
		updatedAt: string;
	}

	interface iTaggedUser {
		username: string;
		user: Omit<
			iUser,
			| "fname"
			| "lname"
			| "age"
			| "followers"
			| "blocklist"
			| "blog"
			| "dob"
			| "occupation"
			| "email"
		>;
	}

	// Clerk
	interface CustomJwtSessionClaims {
		metadata: {
			onboardingComplete?: boolean;
		};
	}

	// ReactBits
	namespace JSX {
		interface IntrinsicElements {
			meshLineGeometry: any;
			meshLineMaterial: any;
		}
	}
}
