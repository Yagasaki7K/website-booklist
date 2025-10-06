import React from "react";
import { ServerStyleSheet } from "styled-components";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { NextSeo } from "next-seo";
import { Toaster } from "sonner";

export default class MyDocument extends Document {
	// Fast refresh with NextJS doesn't broken the CSS
	static async getInitialProps(ctx: any) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App: any) => (props: any) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}
	// Finish Here

	render() {
		return (
			<Html lang="pt-br">
				<NextSeo
					title="BookList: Track, Discover, Share Books"
					description="Track, share, and discover your favorite book with BookList."
					canonical={`https://thebooklist.vercel.app/`}
					openGraph={{
						url: "https://thebooklist.vercel.app/",
						title: "BookList: Track, Discover, Share Books",
						description:
							"Track, share, and discover your favorite book with BookList.",
						images: [
							{
								url: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
								width: 460,
								height: 460,
								alt: "BookList: Track, Discover, Share Books",
								type: "image/jpeg",
							},
						],
						siteName: "BookList: Track, Discover, Share Books",
					}}
					twitter={{
						handle: "@Yagasaki7K",
						site: "@Yagasaki7K",
						cardType: "summary_large_image",
					}}
				/>

				<Toaster richColors position="top-right" />

				<Head>
					<meta
						name="keywords"
						content="book, livros, compartilhar, share, track, discover, virtuais, descobrir, seguir, trilhar"
					/>

					<meta name="author" content="Anderson 'Yagasaki' Marlon" />
					<meta name="robots" content="index, follow" />
					<link rel="icon" type="image/png" href="/discord.png" />

					<meta property="og:locale" content="pt_BR" />

					<link
						rel="stylesheet"
						href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
					/>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
