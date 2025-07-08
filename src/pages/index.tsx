import HomeDetails from "@/components/HomeDetails";
import Navigation from "@/components/Navigation";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { toast } from "sonner";

export default function Home() {
	const router = useRouter();
	const [getUrl, setUrl] = useState("");

	async function insertUserInSupabase() {
		const { data: user } = await supabase.auth.getUser();

		await supabase.from("users").insert({
			id: user.user?.id,
			user_name: "Nome Completo",
			user_email: email,
			user_books: [],
		});
	}

	const handleSignup = async () => {
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) return alert(error.message);
		toast.success("Cadastro feito! Verifique seu e-mail.");
		insertUserInSupabase();
		router.push("/");
	};

	// get the URL
	useEffect(() => {
		const fullUrl = window.location.href;
		const page = fullUrl.split("?page=")[1];
		setUrl(page);
	}, [router.asPath]);

	const handleLogin = () => {
		router.push("/?page=login");
	};

	const handleSignUp = () => {
		router.push("/?page=signup");
	};

	const handleHome = () => {
		router.push("/");
	};

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
						<h4>#1</h4>
						<div className="book">
							<div className="leftContent">
								<img src="/books/1.png" alt="" width={100} height={100} />
								<div className="content">
									<h3>The Great Gatsby - F. Scott Fitzgerald</h3>
									<p>
										<span>adventure</span> <span>fantasy</span>{" "}
										<span>mystery</span>
									</p>
								</div>
							</div>
							<div className="rightContent">
								<p>
									<i className="uil uil-smile"></i> 28971 users
								</p>
								<p>
									<i className="uil uil-book"></i> 2015
								</p>
							</div>
						</div>
					</div>
				</div>

				{getUrl === "login" ? (
					<div className="modal-login">
						<div className="modal-content">
							<img src="/logo-white.png" alt="" />
							<div className="header">
								<h2>Fazer Login</h2>
								<button className="close-modal" onClick={() => handleHome()}>
									<i className="uil uil-times"></i>
								</button>
							</div>
							<form action="">
								<input type="email" placeholder="Seu e-mail" />
								<input type="password" placeholder="Sua senha" />
								<button type="submit">Entrar</button>
								<p className="link">Esqueci minha senha</p>
							</form>
							<p>
								Ainda não tem conta?&nbsp;
								<p className="link" onClick={() => handleSignUp()}>
									Cadastrar
								</p>
							</p>
						</div>
					</div>
				) : null}

				{getUrl === "signup" ? (
					<div className="modal-signup">
						<div className="modal-content">
							<img src="/logo-white.png" alt="" />
							<div className="header">
								<h2>Criar um Cadastro</h2>
								<button className="close-modal" onClick={() => handleHome()}>
									<i className="uil uil-times"></i>
								</button>
							</div>

							<form onSubmit={(e) => e.preventDefault()}>
								<input
									type="email"
									placeholder="Seu Email"
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<input
									type="password"
									placeholder="Sua senha"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<input
									type="password"
									placeholder="Repita sua senha"
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
								<button
									type="submit"
									onClick={
										confirmPassword === password
											? () => handleSignup()
											: () => toast.warning("As senhas devem ser iguais")
									}
								>
									Cadastrar
								</button>
							</form>
							<p>
								Já tenho uma conta.&nbsp;
								<p className="link" onClick={() => handleLogin()}>
									Fazer Login
								</p>
							</p>
						</div>
					</div>
				) : null}
			</HomeDetails>
		</>
	);
}
