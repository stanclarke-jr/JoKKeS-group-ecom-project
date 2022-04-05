import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { JokkesContext } from "../Context/JokkesContext";
import { Loading } from "../Shared/constants";

const SingleProduct = () => {
  // useParams to get itemID. Dispatch action to get product details (see CONTEXT DOCS)
  const { itemId } = useParams();

  const {
    actions: { dispatchAction, ACTIONS },
    state: { currProduct, allProducts },
  } = useContext(JokkesContext);

  useEffect(() => {
    dispatchAction(ACTIONS.getProductDetails, { id: itemId }); //Pass the ID as well!!
  }, [itemId]);

  const handleClick = (ev) => {
    ev.preventDefault();
    dispatchAction(ACTIONS.addToCart, { id: itemId, qty: 1 });
  };

  return (
    <Wrapper>
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
  font-family: var(--main-font);
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 20px;
`;

const ContentWrapper = styled.div`
  font-size: 24px;
  margin: 40px 0px 20px 0px;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ItemInfoWrapper = styled.div`
  margin-bottom: 35px;
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`;

const ItemName = styled.h1`
  padding: 5px;
`;

const ItemCategory = styled.h2`
  font-style: italic;
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
  border: var(--main-color) 2px solid;
`;

const ItemBuy = styled.div`
  align-self: center;
  p {
    margin: 10px 0;
    border-radius: 15px;
    color: white;
    font-size: 24pt;
    width: fit-content;
    padding: 30px 40px;
    font-size: 24pt;
  }
  .inStock {
    cursor: pointer;
    background-color: var(--purple-color);
  }

  .outOfStock {
    cursor: not-allowed;
    background-color: red;
  }
`;

export default SingleProduct;
