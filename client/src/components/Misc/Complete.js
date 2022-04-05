import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Complete = () => {
  return (
    <Wrapper>
      Order completed! Thank you for your order!
      <CheckoutButton to="/shop">Continue Shopping</CheckoutButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  font-size: 32px;
  z-index: 4;
`;

export default Complete;

const CheckoutButton = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 60px;
  background-color: var(--purple-color);
  font-size: 28px;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 50px;
  transition: 0.3s;
  margin: 50px;
  &:hover {
    opacity: 0.8;
  }
`;
