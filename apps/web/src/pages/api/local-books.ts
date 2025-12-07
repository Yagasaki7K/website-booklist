import type { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";
import { resolve } from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Caminho correto no seu monorepo
		const filePath = resolve(process.cwd(), "../api/data/books.json");

		const raw = await readFile(filePath, "utf8");
		const json = JSON.parse(raw);

		res.status(200).json(json);
	} catch (e) {
		console.error("Erro ao carregar fallback local:", e);
		res.status(500).json({ error: "Failed to load local JSON" });
	}
}
