import { Elysia, t } from "elysia";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { cors } from "@elysiajs/cors";

const DB_PATH = resolve("./data/books.json");

async function loadProducts() {
  const raw = await readFile(DB_PATH, "utf8");
  return JSON.parse(raw);
}

async function saveProducts(data: any) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

const ProductSchema = t.Object({
  name: t.String(),
  price: t.Number(),
  sizes: t.Array(t.String()),
  category: t.String(),
  type: t.String(),
  images: t.Array(t.String()),
  description: t.String()
});

const app = new Elysia()
  .get("/", () => ({ message: "API running with Elysia!" }))

  .get("/products", async () => {
    return await loadProducts();
  })

  .get("/products/:id", async ({ params }) => {
    const products = await loadProducts();
    return products.find((p: any) => p.id === params.id) ?? { error: "Not found" };
  })

  .post(
    "/products",
    async ({ body }) => {
      const products = await loadProducts();

      const newProduct = {
        id: String(Date.now()),
        ...body
      };

      products.push(newProduct);
      await saveProducts(products);

      return { success: true, product: newProduct };
    },
    { body: ProductSchema }
  )

  .put(
    "/products/:id",
    async ({ params, body }) => {
      const products = await loadProducts();
      const index = products.findIndex((p: any) => p.id === params.id);

      if (index === -1) return { error: "Not found" };

      products[index] = {
        ...products[index],
        ...body
      };

      await saveProducts(products);

      return { success: true, product: products[index] };
    },
    { body: ProductSchema }
  )

  .delete("/products/:id", async ({ params }) => {
    const products = await loadProducts();
    const filtered = products.filter((p: any) => p.id !== params.id);

    if (filtered.length === products.length)
      return { error: "Not found" };

    await saveProducts(filtered);

    return { success: true, deletedId: params.id };
  })

  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  )

  .listen(3001);

console.log("🔥 Elysia API running at http://localhost:3001");
