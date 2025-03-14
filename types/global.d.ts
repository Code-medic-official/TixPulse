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
		_id: string;
		hosts: (string | iUser)[];
		specialGuest?: (string | iUser)[];
		name: string;
		description: string;
		banner?: string;
		date: string;
		venue: string; // ? site/hall/building
		location?: string; // 🤔 Google maps
		state: "Draft" | "Published" | "Cancelled" | "Expired";
		createdAt: string;
		updatedAt: string;

		// ? 🤔
		ageLimit?: number;
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
