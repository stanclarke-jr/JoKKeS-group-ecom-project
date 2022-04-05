import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HERO_IMAGE } from "../Shared/constants";

const Header = () => {
  return (
    <Wrapper>
      <HeaderContainer className="text">
        <HeaderWrapper>
          <NavLink to="/cart">
            <Cart src="/assets/cart.svg" alt="cart icon"></Cart>
          </NavLink>
        </HeaderWrapper>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          {" "}
          <Text>JOKKES WEARABLES</Text>
        </NavLink>
      </HeaderContainer>
    </Wrapper>
  );
};

const HeaderContainer = styled.div`
  background-size: cover;
  background-image: url(${HERO_IMAGE});
  position: relative;
  height: 250px;
  margin-bottom: 60px;
`;

const Text = styled.div`
  background-color: white;
  color: black;
  font-size: 5vw;
  font-weight: bold;
  margin: 0 auto;
  padding: 10px;
  width: 50%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: screen;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  font-family: var(--main-font);
`;

const HeaderWrapper = styled.div`
  height: 60px;
  text-align: right;
  padding: 20px 30px 0px 0px;
  display: flex;
  justify-content: right;
`;

const Cart = styled.img`
  width: 50px;
  padding-left: 12px;
`;

export default Header;
