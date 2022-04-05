import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CategoryHome from "./CategoryHome";
import { useEffect, useContext } from "react";
import { JokkesContext } from "../Context/JokkesContext";
import { Loading } from "../Shared/constants";

const Home = () => {
  const {
    state: { categories },
    actions: { dispatchAction, ACTIONS },
  } = useContext(JokkesContext);

  useEffect(() => {
    if (categories == null) dispatchAction(ACTIONS.getCategories);
  }, []);

  return (
    <Wrapper>
      {categories ? (
        <CategoriesWrapper>
          <ImageWrapper>
            <ShopText>
              SHOP BY CATEGORY<Arrow src="/assets/arrowSlate.png"></Arrow>
            </ShopText>
          </ImageWrapper>

          {categories.map((category) => {
            return <CategoryHome name={category.category} imageSrc={category.imageSrc} key={category._id} />;
          })}

          <ImageWrapper>
            <NavLink to="/shop" style={{ textDecoration: "none" }}>
              <ShopText>
                SHOP ALL CATEGORIES<Arrow src="/assets/arrowSlate.png"></Arrow>
              </ShopText>
            </NavLink>
          </ImageWrapper>
        </CategoriesWrapper>
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: var(--main-font);
  flex: 1;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
`;

const ImageWrapper = styled.div`
  padding: 10px 10px 45px 10px;
  margin-left: auto;
  margin-right: auto;
`;

const ShopText = styled.div`
  width: 300px;
  height: 300px;
  background-color: var(--main-color);
  border-radius: 8px;
  font-size: 28px;
  font-weight: 900;
  padding: 100px 50px;
  line-height: 38px;
  color: white;
`;

const Arrow = styled.img`
  width: 55px;
  margin: 15px 0px 0px 2px;
`;

export default Home;
