import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Navigation from "@/components/Navigation";
import SlugDetails from "@/components/SlugDetails";

interface Book {
	id: string;
	title: string;
	subtitle?: string;
	description?: string;
	authors?: string[];
	publisher?: string;
	publishedDate?: string;
	pageCount?: number;
	categories?: string[];
	averageRating?: number;
	ratingsCount?: number;
	image?: string;
	link?: string;
}

export default function BookPage() {
	const router = useRouter();
	const { slug } = router.query;
	const [book, setBook] = useState<Book | null>(null);
	const [loading, setLoading] = useState(true);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (!slug) return;

		async function fetchBook() {
			try {
				setLoading(true);
				const res = await fetch(
					`https://www.googleapis.com/books/v1/volumes/${slug}`,
				);
				const data = await res.json();

				const info = data.volumeInfo;

				setBook({
					id: data.id,
					title: info.title,
					subtitle: info.subtitle,
					description: info.description,
					authors: info.authors,
					publisher: info.publisher,
					publishedDate: info.publishedDate,
					pageCount: info.pageCount,
					categories: info.categories,
					averageRating: info.averageRating,
					ratingsCount: info.ratingsCount,
					image: info.imageLinks?.thumbnail || "/no-cover.png",
					link: info.infoLink,
				});
			} catch (err) {
				console.error("Erro ao buscar livro:", err);
			} finally {
				setLoading(false);
			}
		}

		fetchBook();
	}, [slug]);

	if (loading) {
		return (
			<p style={{ textAlign: "center", marginTop: "2rem" }}>Carregando...</p>
		);
	}

	if (!book) {
		return (
			<p style={{ textAlign: "center", marginTop: "2rem" }}>
				Livro não encontrado.
			</p>
		);
	}

	return (
		<>
			<Head>
				<title>{book.title} — BookList</title>
				<meta
					name="description"
					content={book.description?.slice(0, 150) || ""}
				/>
			</Head>

			<Navigation />

			<SlugDetails>
				<div className="bookPage">
					<div className="book">
						<img src={book.image} alt={book.title} width={200} height={300} />
						<div>
							<h1>{book.title}</h1>
							{book.subtitle && <h2>{book.subtitle}</h2>}
							{book.authors && (
								<p>
									<b>Author(es):</b> {book.authors.join(", ")}
								</p>
							)}
							{book.publisher && (
								<p>
									<b>Editors:</b> {book.publisher} ({book.publishedDate})
								</p>
							)}

							{book.pageCount && (
								<p>
									<b>Pages:</b> {book.pageCount}
								</p>
							)}
							{book.categories && (
								<p>
									<b>Categories:</b> <span>{book.categories.join(", ")}</span>
								</p>
							)}

							{book.description && (
								<div className="description">
									<p dangerouslySetInnerHTML={{ __html: book.description }} />
								</div>
							)}

							{book.averageRating && (
								<p>
									<b>Rating:</b> {book.averageRating} ⭐ ({book.ratingsCount}{" "}
									reviews)
								</p>
							)}

							<div className="buttons">
								<a
									className="addList"
									href={book.link}
									target="_blank"
									rel="noreferrer"
								>
									Add to List
								</a>

								<a
									className="googleBooks"
									href={book.link}
									target="_blank"
									rel="noreferrer"
								>
									See in Google Books
								</a>

								<a
									className={isFavorite ? "isFavorite" : "notFavorite"}
									onClick={() => setIsFavorite(!isFavorite)}
									target="_blank"
									rel="noreferrer"
								>
									🤍
								</a>
							</div>
						</div>
					</div>
				</div>
			</SlugDetails>
		</>
	);
}
