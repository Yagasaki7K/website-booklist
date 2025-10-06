export interface BooksProps {
	title: string;
	description: string;
	image: string;
	link: string;
	categories: string[];
	authors: string[];
	pages: number;
	download: string;
	downloadEpub?: string;
	downloadPDF?: string;
	downloadMobi?: string;
}
