import styled from "styled-components";

const CheckoutItem = ({ item }) => {
  return (
    <>
      <ItemWrapper>
        <InfoWrapper>
          <ProductImg src={item.imageSrc} />
          <ItemName>{item.name}</ItemName>
        </InfoWrapper>
        <CartDetails>
          <Qty>{item.qty}</Qty>
          <Symbols>×</Symbols>
          <Price>{item.price}</Price>
          <Symbols>=</Symbols>
          <ItemTotal>$ {item.priceForQty.toFixed(2)}</ItemTotal>
        </CartDetails>
      </ItemWrapper>
    </>
  );
};

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
const Qty = styled.h3`
  text-align: center;
  font-size: 18pt;
  width: 75px;
  padding: 5px;
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

export default CheckoutItem;
