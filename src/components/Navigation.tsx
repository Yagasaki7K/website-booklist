import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const NavigationDetails = styled.div`
    .navigation {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16rem;
        background: var(--navigation);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

        .logo {
            img {
                width: 70px;
                height: 70px;
                padding: 1rem;
                cursor: pointer;
            }
        }

        .content {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 15rem;

            li {
                list-style: none;
                padding: 1rem;
                font-size: 0.95rem;
                color: var(--gray);
                transition: all 0.3s ease;
                font-weight: 600;
                cursor: pointer;
                &:hover {
                    color: var(--white);
                }
            }

            .login {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 10rem;

                .loginbtn {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    font-size: 0.95rem;
                    margin-right: 1.5rem;
                    color: var(--gray);
                    transition: all 0.3s ease;
                    font-weight: 600;
                    &:hover {
                        color: var(--white);
                    }
                }

                .signupbtn {
                    background: var(--primary);
                    color: var(--white);
                    padding: 0.8rem 1rem;
                    border-radius: 10px;
                    font-size: 0.95rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;

                    &:hover {
                        transform: scale(1.05);
                        box-shadow: 0 0 10px 0 var(--primary);
                    }
                }
            }
        }
    }
`;

const Navigation = () => {
	const router = useRouter();

	const [user, setUser] = useState<any>(null);
	const [userData, setUserData] = useState<any>(null);

	return (
		<NavigationDetails>
			<div className="navigation">
				<div className="logo">
					<img
						onClick={() => router.push("/")}
						src="/logo.png"
						alt="BookList"
					/>
				</div>
				<div className="content">
					<li onClick={() => router.push("/")}>Home</li>
					<li onClick={() => router.push("/search")}>Search</li>
					<li onClick={() => router.push("/profile")}>Profile</li>
					<li onClick={() => router.push("/top")}>Top 10</li>
					<li onClick={() => router.push("https://discord.gg/hnkScv9p5M")}>
						Discord
					</li>

					<div className="login">
						{user ? (
							<>
								<button
									className="loginbtn"
									onClick={() => router.push("/profile")}
								>
									Olá, {user.user_name.split(" ")[0]!}
								</button>
								<button className="signupbtn">Logoff</button>
							</>
						) : (
							<>
								<button className="loginbtn">Login</button>
								<button className="signupbtn">Sign Up</button>
							</>
						)}
					</div>
				</div>
			</div>
		</NavigationDetails>
	);
};

export default Navigation;
