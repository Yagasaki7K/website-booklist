import HomeDetails from "@/components/HomeDetails";
import Navigation from "@/components/Navigation";
import { GoogleBook } from "@/types/GoogleBook";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Search() {
	const [query, setQuery] = useState("");
	const [books, setBooks] = useState<GoogleBook[]>([]);
	const [loading, setLoading] = useState(false);
	const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
		null,
	);

	useEffect(() => {
		if (!query.trim()) {
			setBooks([]);
			return;
		}

		if (typingTimeout) clearTimeout(typingTimeout);

		const timeout = setTimeout(async () => {
			try {
				setLoading(true);
				const res = await fetch(
					`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
						query,
					)}&maxResults=20&orderBy=relevance`,
				);
				const data = await res.json();
				setBooks(data.items || []);
			} catch (error) {
				console.error("Erro ao buscar livros:", error);
			} finally {
				setLoading(false);
			}
		}, 600); // atraso de 600ms para evitar chamadas excessivas à API

		setTypingTimeout(timeout);
	}, [query]);

	return (
		<>
			<Head>
				<title>Search Books | BookList</title>
				<meta
					name="description"
					content="Search and discover your favorite books with BookList."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<Navigation />

			<HomeDetails>
				<div className="top">
					<h2>Search Your Favorite Book</h2>

					<div className="search-bar">
						<input
							type="text"
							placeholder="Search for books..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>

					{loading ? (
						<p>Loading...</p>
					) : query && books.length === 0 ? (
						<p>No books found.</p>
					) : (
						<div className="books">
							{books.map((item) => {
								const info = item.volumeInfo;
								return (
									<div className="contain" key={item.id}>
										<div className="book">
											<div className="leftContent">
												<img
													src={
														info.imageLinks?.thumbnail || "/default-book.png"
													}
													alt={info.title}
													width={100}
													height={100}
												/>

												<div className="content">
													<Link href={`/book/${item.id}`}>
														<h3>{info.title}</h3>
													</Link>
													{info.categories && (
														<p>
															{info.categories.map((genre, index) => (
																<span key={index}>{genre.toLowerCase()}</span>
															))}
														</p>
													)}
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</HomeDetails>
		</>
	);
}
