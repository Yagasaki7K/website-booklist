export interface GoogleBook {
	id: string;
	volumeInfo: {
		title: string;
		authors?: string[];
		categories?: string[];
		imageLinks?: {
			smallThumbnail?: string;
			thumbnail?: string;
		};
		infoLink?: string;
	};
}
