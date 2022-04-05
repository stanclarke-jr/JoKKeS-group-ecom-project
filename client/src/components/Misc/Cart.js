import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { JokkesContext } from "../Context/JokkesContext";
import React from "react";
import CartItem from "./CartItem";
import { Loading } from "../Shared/constants";

const Cart = () => {
  const {
    actions: { dispatchAction, ACTIONS },
    state: { cart, total, allProducts },
  } = useContext(JokkesContext);

  useEffect(() => {
    dispatchAction(ACTIONS.updateTotal);
  }, []);

  return (
    <>
      {allProducts != null ? (
        <Wrapper>
          <MainHeader>Shopping Cart</MainHeader>
          <CartItems>
            {Object.entries(cart).length ? (
              Object.entries(cart).map(([id, item]) => {
                return <CartItem item={item} id={id} key={`cartItem-${id}`} />;
              })
            ) : (
              <EmptyCart>Your cart is empty.</EmptyCart>
            )}
          </CartItems>
          <CheckoutWrapper>
            <Total className={Object.entries(cart).length ? "show" : "hidden"}>Total: ${total.toFixed(2)}</Total>
            <CheckoutButton to={Object.entries(cart).length ? "/checkout" : "/shop"}>{Object.entries(cart).length ? "Checkout" : "Start Shopping"}</CheckoutButton>
          </CheckoutWrapper>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  flex: 1;
  margin: 10px;
`;
const MainHeader = styled.h1`
  font-size: 44px;
  text-align: center;
`;

const CartItems = styled.div`
  display: flex;
  gap: 10px;
  flex-flow: column nowrap;
`;

const Total = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin: 75px 0 25px 0;

  &.show {
    display: block;
  }
  &.hidden {
    display: none;
  }
`;
const CheckoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyCart = styled.div`
  flex: 1;
  align-self: center;
  font-size: 24pt;
  font-style: italic;
`;

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

  &:hover {
    opacity: 0.8;
  }
`;
export default Cart;
