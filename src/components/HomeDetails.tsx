import styled from "styled-components";

const HomeDetails = styled.div`
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 4rem;

        h1 {
            font-size: 2.8rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            text-align: center;
        }

        p {
            font-size: 1.6rem;
            font-weight: 400;
            margin-bottom: 2rem;
            max-width: 35rem;
            text-align: center;
            color: var(--gray);
            line-height: 1.4;
        }

        .parent {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 3rem;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;

            .div1, .div2, .div3, .div4 {
                display: flex;
                align-items: flex-start;
                padding: 1.5rem;
                background: var(--navigation);
                border-radius: 1rem;

                .leftContent {
                    margin-right: 1.5rem;
                    flex-shrink: 0;

                    img {
                        width: 100px;
                        height: 100px;
                        object-fit: contain;
                    }
                }

                .rightContent {
                    h2 {
                        font-size: 1.4rem;
                        font-weight: 600;
                        margin-bottom: 0.8rem;
                        color: var(--white);
                    }

                    p {
                        text-align: left;
                        font-size: 1rem;
                        line-height: 1.5;
                        color: var(--gray);
                        margin: 0;
                        width: 100%;
                    }
                }
            }
        }

        button {
            margin: 3rem 0 0 0;
            padding: 0.5rem 1rem;
            font-size: 1.3rem;
            font-weight: 600;
            border-radius: 3rem;
            border: none;
            background: var(--primary);
            color: var(--white);
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

            i {
                font-size: 1.1rem;
                margin-left: 3rem;
                background: var(--white);
                color: var(--primary);
                padding: 8px 9px;
                border-radius: 50%;
                transition: transform 0.2s ease;
            }

            &:hover {
                box-shadow: 0 0 25px var(--primary);
            }
        }
    }

    @media (max-width: 1200px) {
        .content {
            .parent {
                grid-template-columns: 1fr;
                padding: 2rem 1rem;
            }
        }
    }

    @media (max-width: 768px) {
        .content {
            margin-top: 2rem;
            padding: 0 1rem;

            h1 {
                font-size: 2rem;
            }

            p {
                font-size: 1.2rem;
                max-width: 100%;
            }
        }
    }

    .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 4rem;
        padding: 0 1rem;

        h2 {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        h4 {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            margin-top: 1.5rem;
            margin-right: 1rem;
        }

        .books {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 1rem;
            width: 75rem;

            .book {
                background: var(--navigation);
                padding: 1rem;
                display: flex;
                flex-direction: row;
                border-radius: 15px;
                width: 100%;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .leftContent {
                margin-right: 1rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                flex: 1;

                img {
                    width: 50px;
                    height: 50px;
                    object-fit: contain;
                    margin-right: 1rem;
                }

                .content {
                    display: flex;
                    flex-direction: column;

                    h3 {
                        font-size: 1.2rem;
                        font-weight: 600;
                        margin: -3.5rem 0 0 0;

                        &:hover {
                            cursor: pointer;
                            color: var(--primary);
                        }
                    }

                    p {
                        font-size: 1rem;
                        font-weight: 400;
                        margin-bottom: 0.5rem;
                        text-align: left;

                        span {
                            background: var(--primary);
                            color: var(--white);
                            padding: 0.1rem 0.5rem;
                            border-radius: 15px;
                            margin-top: 0.5rem;
                            margin-right: 0.5rem;
                            font-size: 0.8rem;
                        }
                    }
                }

                p {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }
            }

            .rightContent {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
                gap: 2rem;
                margin-left: auto;
                flex-wrap: wrap;

                p {
                    margin: 0;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .top {
            margin-top: 2rem;

            h2 {
                font-size: 1.5rem;
            }

            h4 {
                font-size: 1.5rem;
            }

            .books {
                .book {
                    padding: 0.8rem;
                }

                .leftContent {
                    margin-right: 0;

                    img {
                        width: 40px;
                        height: 40px;
                    }

                    .content {
                        h3 {
                            font-size: 1rem;
                        }

                        p {
                            font-size: 0.9rem;
                        }
                    }
                }

                .rightContent {
                    width: 100%;
                    justify-content: flex-start;
                    gap: 1rem;
                }
            }
        }
    }

    .modal-login, .modal-signup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 5;
        display: flex;

        .modal-content {
            display: flex;
            justify-content: center;
            flex-direction: column;
            gap: 1rem;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary);
            z-index: 10;
            position: fixed;
            padding: 2rem 2.5rem;
            border-radius: 1rem;
            backdrop-filter: blur(15px);

            .link {
                color: var(--white);
                cursor: pointer;
                transition: all 0.3s ease-in-out;

                &:hover {
                    text-decoration: underline;
                    color: var(--white);
                }
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                button {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    font-size: 1.5rem;
                    color: var(--white);
                }
            }

            p {
                display: flex;
                justify-content: center;
            }

            form {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 1rem;

                input {
                    width: 20rem;
                    height: 3rem;
                    border-radius: 1rem;
                    padding: 1rem;
                    border: none;
                    outline: none;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--black);
                    background: var(--white);

                    &::placeholder {
                        color: var(--gray);
                    }

                    @media (max-width: 768px) {
                        width: 100%;
                        max-width: 20rem;
                        padding: 0.8rem;
                        font-size: 0.9rem;
                    }
                }

                button {
                    width: 20rem;
                    height: 3rem;
                    border-radius: 1rem;
                    padding: 1rem;
                    border: none;
                    outline: none;
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--primary);
                    background: var(--white);
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 0.3s ease-in-out;

                    &:hover {
                        background: var(--primary);
                        color: var(--white);
                        border: 1px solid var(--white);
                    }

                    @media (max-width: 768px) {
                        width: 100%;
                        max-width: 20rem;
                        padding: 0.8rem;
                        font-size: 0.9rem;
                    }
                }

                p {
                    margin-bottom: -1rem;
                }
            }
        }

        @media (max-width: 768px) {
            padding: 2rem 1rem;
            width: 90%;
            max-width: 400px;
            height: auto;
            border-radius: 1rem;
        }

        img {
            width: 200px;
            height: auto;
            margin: 0 auto;

            @media (max-width: 768px) {
                width: 150px;
            }
        }
    }
`

export default HomeDetails;
