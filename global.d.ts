export interface iUser {
	_id?: string;
	clerkId: string;
	username: string;
	fname: string;
	lname: string;
	imageUrl?: string;
	email: string;
	onboarded: boolean;
	followers?: (string | iUser)[];
	blocklist?: (string | iUser)[];

	// ! Onboarding fields
	bio?: string;
	dob: string;
	location?: string;
	occupation?: string;
	createdAt: string;
	updatedAt: string;
}

export interface iEvent {
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

export interface iTicketTier {
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

export interface iTicket {
	_id: string;
	tier: string | iTicketTier;
	owner: string | iUser;
	status: "Valid" | "Used" | "Refunded" | "Cancelled" | "Expired";
	paymentId? : string;
	createdAt: string;
	updatedAt: string;
}

declare module "*.glb";
declare module "*.png";

declare module "meshline" {
	export const MeshLineGeometry: any;
	export const MeshLineMaterial: any;
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			meshLineGeometry: any;
			meshLineMaterial: any;
		}
	}
}
