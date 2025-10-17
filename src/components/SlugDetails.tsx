import styled from "styled-components";

const SlugDetails = styled.div`
.bookPage {
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .book {
        display: flex;
        gap: 30px;
        align-items: center;
        max-width: 80vw;

        img {
            width: 200px;
            height: 300px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .buttons {
            display: flex;
            align-items: center;
            gap: 10px;

            a {
                display: inline-block;
                margin-top: 10px;
                color: #fff;
                border-radius: 6px;
                text-decoration: none;
            }

            .addList {
                padding: 10px 20px;
                background: var(--primary);
                transition: background-color 0.3s ease;

                &:hover {
                    background: var(--primary-hover);
                }
            }

            .googleBooks {
                padding: 10px 20px;
                background: var(--gray);
                transition: background-color 0.3s ease;

                &:hover {
                    background: var(--primary-hover);
                }
            }


            .notFavorite {
                padding: 8px 10px;
                transition: background-color 0.3s ease;
                border: 1px solid var(--red);
                cursor: pointer;
            }

            .isFavorite {
                padding: 8px 10px;
                transition: background-color 0.3s ease;
                background: var(--red);
                border: 1px solid var(--red);
                cursor: pointer;
            }
        }

        span, h1 {
            color: var(--primary);
        }
    }

    .description {
        margin-top: 10px;
        line-height: 1.6;
    }
}
`;

export default SlugDetails;
