import HomeDetails from "@/components/HomeDetails";
import Navigation from "@/components/Navigation";
import { GoogleBook } from "@/types/GoogleBook";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Top() {
	const [books, setBooks] = useState<GoogleBook[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchBooks() {
			try {
				setLoading(true);
				const res = await fetch(
					`https://www.googleapis.com/books/v1/volumes?q=bestselling+books+worldwide&maxResults=10&orderBy=relevance`,
				);
				const data = await res.json();

				setBooks(data.items || []);
			} catch (error) {
				console.error("Erro ao buscar livros:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchBooks();
	}, []);

	return (
		<>
			<Head>
				<title>BookList: Track, Discover, Share Books</title>
				<meta
					name="description"
					content="Track, share, and discover your favorite book with BookList."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<Navigation />

			<HomeDetails>
				<div className="top">
					<h2>Top 10 Books</h2>

					{loading ? (
						<p>Loading ...</p>
					) : (
						<div className="books">
							{books.map((item, index) => {
								const info = item.volumeInfo;
								return (
									<div className="contain" key={item.id}>
										<h4>#{index + 1}</h4>
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
													<Link href={"/book/" + item.id || "/404"}>
														<h3>{info.title}</h3>
													</Link>
													<p>
														{info.categories &&
															info.categories.map((genre, index) => (
																<span key={index}>{genre.toLowerCase()}</span>
															))}
													</p>
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
