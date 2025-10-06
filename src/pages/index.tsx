import HomeDetails from "@/components/HomeDetails";
import Navigation from "@/components/Navigation";
import signature from "@/components/signature";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
	const router = useRouter();
	const [data, setData] = useState([]);
	const [getUrl, setUrl] = useState("");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

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
				<div className="content">
					<h1>The next-generation book platform</h1>
					<p>Track, share, and discover your favorite book with BookList.</p>

					<div className="parent">
						<div className="div1">
							<div className="leftContent">
								<img src="/stats.svg" alt="" width={100} height={100} />
							</div>
							<div className="rightContent">
								<h2>Discover your obsessions</h2>
								<p>
									What are your highest rated genres or most readed books?
									Follow your watching habits over time with in-depth
									statistics.
								</p>
							</div>
						</div>
						<div className="div2">
							<div className="leftContent">
								<img src="/apps.svg" alt="" width={100} height={100} />
							</div>
							<div className="rightContent">
								<h2>Bring BookList anywhere</h2>
								<p>
									Keep track of your progress on-the-go with one of many
									BookList apps across iOS, Android, macOS, and Windows.
								</p>
							</div>
						</div>
						<div className="div3">
							<div className="leftContent">
								<img src="/social.svg" alt="" width={100} height={100} />
							</div>
							<div className="rightContent">
								<h2>Join the conversation</h2>
								<p>
									Share your thoughts with our thriving community, make friends,
									socialize, and receive recommendations.
								</p>
							</div>
						</div>
						<div className="div4">
							<div className="leftContent">
								<img src="/custom.svg" alt="" width={100} height={100} />
							</div>
							<div className="rightContent">
								<h2>Tweak it to your liking</h2>
								<p>
									Customize your scoring system, title format, color scheme, and
									much more! Also, we have a dark mode.
								</p>
							</div>
						</div>
					</div>

					<button onClick={() => router.push("/signup")}>
						Join Now <i className="uil uil-angle-right-b"></i>
					</button>
				</div>
				<div className="top">
					<h2>Top 10 Books</h2>

					<div className="books">
						{signature &&
							signature.map((item, index) => {
								return (
									<>
										<div className="contain">
											<h4>#{index + 1}</h4>
											<div className="book">
												<div className="leftContent">
													<img
														src={item.image}
														alt={item.title}
														width={100}
														height={100}
													/>

													<div className="content">
														<Link href={item.link} key={index}>
															<h3>{item.title}</h3>
														</Link>
														<p>
															{item.categories &&
																item.categories.map((genre, index) => {
																	return (
																		<span key={index}>
																			{genre.toLowerCase()}
																		</span>
																	);
																})}
														</p>
													</div>
												</div>
											</div>
										</div>
									</>
								);
							})}
					</div>
				</div>
			</HomeDetails>
		</>
	);
}
