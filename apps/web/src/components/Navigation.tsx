import styled from "styled-components";
import Link from "next/link";

const NavigationDetails = styled.div`
  display: flex;
  padding: 1rem 2rem;
  justify-content: space-between;
  align-items: center;

  li {
      list-style: none;

      img {
          width: 8rem;
      }
  }
`;

const Navigation = () => {
	return (
		<NavigationDetails>
			<li>
				<Link href="#">Home</Link>
			</li>
		</NavigationDetails>
	);
};

export default Navigation;
