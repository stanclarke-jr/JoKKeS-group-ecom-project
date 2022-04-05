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
  margin-right: auto;
  margin-left: auto;
  margin-top: 40px;
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

export default SingleProduct;
