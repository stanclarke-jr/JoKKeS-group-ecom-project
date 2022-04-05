import styled from "styled-components";
import { useParams, NavLink } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { JokkesContext } from "../Context/JokkesContext";
import { Loading } from "../Shared/constants";

const SingleProduct = () => {
  // useParams to get itemID. Dispatch action to get product details (see CONTEXT DOCS)
  const { itemId } = useParams();
  const [addedToCart, setAddedToCart] = useState("hidden");

  const {
    actions: { dispatchAction, ACTIONS },
    state: { currProduct, allProducts },
  } = useContext(JokkesContext);

  useEffect(() => {
    dispatchAction(ACTIONS.getProductDetails, { id: itemId }); //Pass the ID as well!!
  }, [itemId]);

  const handleClick = (ev) => {
    ev.preventDefault();
    setAddedToCart("show");
    dispatchAction(ACTIONS.addToCart, { id: itemId, qty: 1 });
  };

  const closeAlert = (ev) => {
    setAddedToCart("hidden");
  };

  useEffect(() => {
    if (addedToCart === "show") {
      let alert = setTimeout(() => {
        setAddedToCart("hidden");
      }, 5000);
      return () => clearTimeout(alert);
    }
  }, [addedToCart]);

  return (
    <Wrapper>
      <ShoppingButton to="../">Back</ShoppingButton>
      {currProduct != null && +currProduct?._id === +itemId ? (
        <SectionWrapper>
          <ImageWrapper>
            <Img src={currProduct.imageSrc} />
          </ImageWrapper>
          <ContentWrapper>
            <ItemInfoWrapper>
              <ItemName id="productName" name="productName">
                {currProduct.name}
              </ItemName>
              <ItemCategory id="category" name="Category">
                {currProduct.category}
              </ItemCategory>
            </ItemInfoWrapper>
            <ItemStock handler={handleClick} qty={currProduct.numInStock} price={currProduct.price} />
          </ContentWrapper>
          <Alert className={addedToCart}>
            <Msg>
              Added to Cart!
              <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                <br />
                Click here to view cart
              </span>
            </Msg>
            <CloseBtn onClick={closeAlert}>&times;</CloseBtn>
          </Alert>
        </SectionWrapper>
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
};

const ItemStock = ({ qty, price, handler }) => {
  if (qty > 0) {
    return (
      <ItemBuy onClick={handler}>
        <p className="inStock">{price} - Add to cart</p>
      </ItemBuy>
    );
  } else {
    return (
      <ItemBuy>
        <p className="outOfStock">OUT OF STOCK</p>
      </ItemBuy>
    );
  }
};

const Wrapper = styled.div`
  postion: relative;
  font-family: var(--main-font);
  margin-right: auto;
  margin-left: auto;
  margin-top: 40px;
`;

const Alert = styled.div`
  position: fixed;
  inset: auto 20px 50px auto;
  width: 500px;
  padding: 20px;
  background-color: Lavender;
  color: var(--text-color);
  margin-bottom: 15px;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  border-left: 5px solid var(--purple-color);
  font-size: 18pt;

  &.show {
    display: flex;
  }

  &.hidden {
    display: none;
  }
`;

const Msg = styled.div`
  font-weight: bold;
`;

const CloseBtn = styled.div`
  margin-left: 15px;
  font-weight: bold;
  font-size: 22px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.5;
  }
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
`;

const ContentWrapper = styled.div`
  font-size: 18px;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin-left: 25px;
  margin-right: 50px;
  max-width: 750px;
`;

const ItemInfoWrapper = styled.div`
  margin-bottom: 35px;
  display: flex;
  flex-flow: column nowrap;
`;

const ItemName = styled.h1`
  padding: 5px;
`;

const ItemCategory = styled.h2`
  font-style: italic;
  padding: 10px 0px 0px 2px;
  color: var(--purple-color);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ImageWrapper = styled.div`
  flex: 0 0 300px;
  width: 300px;
  height: 300px;
  margin: 14px;
  padding: 10px;
  border: var(--light-gray-color) 2px solid;
  border-radius: 8px;
  margin: 20px;
`;

const ItemBuy = styled.div`
  p {
    margin-top: 15px;
    border-radius: 15px;
    color: white;
    font-size: 24pt;
    width: fit-content;
    padding: 30px 40px;
    font-size: 22pt;
  }
  .inStock {
    cursor: pointer;
    background-color: var(--purple-color);
  }

  .outOfStock {
    cursor: not-allowed;
    background-color: #e97452;
    opacity: 80%;
  }
`;

const ShoppingButton = styled(NavLink)`
  position: absolute;
  top: 275px;
  left: 20px;
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
  padding: 20px;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

export default SingleProduct;
