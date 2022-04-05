import React, { useEffect, useContext, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import GridProduct from "./GridProduct";
import { JokkesContext } from "../Context/JokkesContext";
import { Loading } from "../Shared/constants";
import CategoryShop from "../Home/CategoryShop";
import PriceFilter from "./PriceFilter";

const Shop = () => {
  const [sortAscending, setSortAscending] = useState(null);
  const [searchParams] = useSearchParams();
  const [sortedProd, setSortedProducts] = useState(null);

  const {
    state: { productsShown, allProducts, companies, categories },
    actions: { dispatchAction, ACTIONS },
  } = useContext(JokkesContext);

  useEffect(() => {
    if (allProducts == null) dispatchAction(ACTIONS.getProducts); //gets all products
    if (categories == null) dispatchAction(ACTIONS.getCategories);
    if (companies == null) dispatchAction(ACTIONS.getCompanies);
  }, []);

  useEffect(() => {
    const filters = {};
    for (const [key, value] of searchParams.entries()) {
      filters[key] = value.toLowerCase();
    }
    if (allProducts) dispatchAction(ACTIONS.filterProducts, filters);
  }, [allProducts, searchParams]);

  // Sort items by increasing/decreasing price
  useEffect(() => {
    if (productsShown) {
      const tempState = productsShown;

      if (sortAscending === "increasing") setSortedProducts(tempState.sort((a, b) => Number(a.price.substring(1)) - Number(b.price.substring(1))));
      else if (sortAscending === "decreasing") setSortedProducts(tempState.sort((a, b) => Number(b.price.substring(1)) - Number(a.price.substring(1))));
      else setSortedProducts(tempState);
    }
  }, [productsShown, sortAscending]);

  const handleClick = (event) => {
    setSortedProducts(null);
    setSortAscending(event.target.value);
  };

  return (
    <Wrapper>
      {sortedProd != null && companies != null && categories != null ? (
        <AllContentWrapper>
          <NavBar>
            <ShopPriceWrapper>
              <ShopAllWrapper>
                <NavLink to="/shop" style={{ textDecoration: "none" }}>
                  <ShopAll>SHOP ALL</ShopAll>
                </NavLink>
              </ShopAllWrapper>
              <PriceFilterWrapper>
                <PriceFilter toggleAscending={handleClick} />
              </PriceFilterWrapper>
            </ShopPriceWrapper>
            <CategoriesWrapper>
              {categories.map((category) => {
                return <CategoryShop name={category.category} imageSrc={category.imageSrc} key={category._id} />;
              })}
            </CategoriesWrapper>
          </NavBar>
          <ProductsWrapper>
            <ProductsInnerWrapper>
              {sortedProd.map((product) => {
                return <GridProduct id={product._id} imgSrc={product.imageSrc} company_id={product.companyId} price={product.price} name={product.name} key={product._id} />;
              })}
            </ProductsInnerWrapper>
          </ProductsWrapper>
        </AllContentWrapper>
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
};

const NavBar = styled.div`
  display: flex;
  width: 90%;
  margin-right: auto;
  margin-left: auto;
`;

const ShopPriceWrapper = styled.div`
  width: 140px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const ShopAllWrapper = styled.div`
  display: flex;
  max-width: 140px;
`;

const PriceFilterWrapper = styled.div`
  display: flex;
  max-width: 140px;
`;

const ShopAll = styled.div`
  width: 140px;
  height: 100px;
  border-radius: 5px;
  margin: 10px;
  background-color: var(--purple-color);
  font-size: 22px;
  font-weight: 900;
  padding: 22px 22px 0px 24px;
  line-height: 30px;
  color: white;
`;

const Wrapper = styled.div`
  font-family: var(--main-font);
`;

const AllContentWrapper = styled.div``;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  overflow-x: auto;
`;

const ProductsWrapper = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const ProductsInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
`;

export default Shop;
