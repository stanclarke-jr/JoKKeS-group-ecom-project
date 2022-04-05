import styled from "styled-components";
import { useContext } from "react";
import { JokkesContext } from "../Context/JokkesContext";

const CartItem = ({ id, item }) => {
  // Access actions
  const {
    actions: { dispatchAction, ACTIONS },
  } = useContext(JokkesContext);
  // Dispatch actions to add items to cart and update cart total
  const updateQty = (ev) => {
    ev.preventDefault();
    let qty = ev.target.value == 0 ? 1 : ev.target.value;
    dispatchAction(ACTIONS.addToCart, { id, qty });
    dispatchAction(ACTIONS.updateTotal);
  };
  // Dispatch actions to remove and item from the cart
  const removeItem = (ev) => {
    dispatchAction(ACTIONS.removeFromCart, { id, qty: "all" });
  };

  return (
    <>
      <ItemWrapper>
        <RemoveBtn onClick={removeItem}>×</RemoveBtn>
        <InfoWrapper>
          <ProductImg src={item.imageSrc} />
          <ItemName>{item.name}</ItemName>
        </InfoWrapper>
        <CartDetails>
          <QtyInput type="number" defaultValue={item.qty} step={1} min={1} max={item.numInStock} name="quantity" title="Qty" inputmode="numeric" onChange={updateQty} />
          <Symbols>×</Symbols>
          <Price>{item.price}</Price>
          <Symbols>=</Symbols>
          <ItemTotal>$ {item.priceForQty.toFixed(2)}</ItemTotal>
        </CartDetails>
      </ItemWrapper>
    </>
  );
};

const RemoveBtn = styled.button`
  padding: 5px;
  margin: 0 50px 0 30px;
  background: none;
  border: none;
  font-size: 24pt;
  cursor: pointer;
`;
const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex: 1.5;
`;
const ProductImg = styled.img`
  width: 150px;
  height: 150px;
  border: var(--main--color) 1px solid;
  border-radius: 10px;
`;
const ItemName = styled.h2`
  margin-top: 20px;
  align-self: flex-start;
`;
const QtyInput = styled.input`
  text-align: center;
  font-size: 18pt;
  width: 75px;
  padding: 5px;
  border: none;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
const CartDetails = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Symbols = styled.h3``;
const ItemTotal = styled.h3`
  font-size: 18pt;
`;
const Price = styled.h4`
  font-style: italic;
`;

export default CartItem;
