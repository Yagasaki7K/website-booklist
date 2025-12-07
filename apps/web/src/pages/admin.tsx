"use client";

import { useEffect, useState } from "react";

interface Product {
	id: string;
	name: string;
	price: number;
	sizes: string[];
	category: string;
	type: string;
	images: string[];
	description: string;
}

export default function ProductsPage() {
	const [books, setBooks] = useState<Product[]>([]);
	const [form, setForm] = useState<Partial<Product>>({});
	const [loading, setLoading] = useState<boolean>(true);
	const API_URL = "http://localhost:3001/books";

	async function loadBooks() {
		try {
			const res = await fetch(API_URL);
			if (!res.ok) throw new Error("API offline");

			const data = await res.json();

			if (!Array.isArray(data)) throw new Error("Invalid API format");

			setBooks(data);
		} catch {
			const local = await fetch("/api/local-books");
			const fallback = await local.json();

			if (!Array.isArray(fallback)) {
				console.error("Fallback não é array:", fallback);
				setBooks([]);
				return;
			}

			setBooks(fallback);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		loadBooks();
	}, []);

	async function handleCreate() {
		await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		setForm({});
		loadBooks();
	}

	async function handleUpdate(id: string) {
		await fetch(`${API_URL}/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		setForm({});
		loadBooks();
	}

	async function handleDelete(id: string) {
		await fetch(`${API_URL}/${id}`, { method: "DELETE" });
		loadBooks();
	}

	return (
		<div style={{ padding: 20 }}>
			<h1>Produtos</h1>

			{loading ? <p>Carregando...</p> : null}

			{/* Formulário */}
			<div style={{ margin: "20px 0", padding: 20, border: "1px solid #333" }}>
				<h2>Adicionar / Atualizar Livros</h2>

				<input placeholder="Nome" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
				<br />

				<input placeholder="Preço" type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
				<br />

				<input placeholder="Tamanhos (P,M,G)" value={form.sizes?.join(",") || ""} onChange={(e) => setForm({ ...form, sizes: e.target.value.split(",") })} />
				<br />

				<input placeholder="Categoria" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} />
				<br />

				<input placeholder="Imagens (/img1.png,/img2.png)" value={form.images?.join(",") || ""} onChange={(e) => setForm({ ...form, images: e.target.value.split(",") })} />
				<br />

				<textarea placeholder="Descrição" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>

				<br />
				<button onClick={handleCreate}>Criar Livro</button>
			</div>

			<hr />

			{/* Listagem de livros */}
			<div style={{ marginTop: 20 }}>
				{books.map((p) => (
					<div
						key={p.id}
						style={{
							border: "1px solid #666",
							marginBottom: 15,
							padding: 15,
							borderRadius: 8,
						}}
					>
						<h3>{p.name}</h3>
						<p>Preço: R$ {p.price}</p>
						<p>Tamanhos: {p.sizes.join(", ")}</p>
						<p>Categoria: {p.category}</p>
						<p>Descrição: {p.description}</p>
						<p>Tipo: {p.type}</p>

						<button onClick={() => handleUpdate(p.id)}>Atualizar</button>
						<button onClick={() => handleDelete(p.id)} style={{ marginLeft: 10 }}>
							Deletar
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
