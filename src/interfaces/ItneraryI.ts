export interface Itinerary {
	id: string;
	destination: string;
	duration: number;
	style: string;
	days: Array<{
		day: number;
		activities: Array<{
			time: string;
			title: string;
			description: string;
			category: string;
		}>;
	}>;
	estimatedCosts: {
		accommodation: number;
		food: number;
		transport: number;
		misc: number;
	};
	summary?: string;
	[key: string]: unknown;
}

export interface FormData {
	destination: string;
	duration: number;
	style: string;
}

export interface ApiError {
	error: string;
}