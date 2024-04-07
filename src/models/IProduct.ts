import type { IRating } from './IRating';

export interface IProduct {
	id: number;
	image?: string;
	description: string;
	title: string;
	price: number;
	category?: string;
	rating?: IRating;
	date?: string;
	isPublished?: boolean;
}