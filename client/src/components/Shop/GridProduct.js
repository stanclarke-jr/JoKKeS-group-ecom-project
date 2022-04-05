import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { JokkesContext } from "../Context/JokkesContext";

// Truncate product name to 45 characters
const truncate = (input) => {
  if (input.length > 45) {
    return input.substring(0, 45) + "...";
  }
  return input;
};

const GridProduct = ({ imgSrc, company_id, price, name, id }) => {
  const {
    state: { companies },
  } = useContext(JokkesContext);

  const [companyName, setCompanyName] = useState(null);

  // Get company name by matching company id numbers
  useEffect(() => {
    let myCompany = companies.find((company) => company._id === company_id);
    if (myCompany != null) setCompanyName(myCompany.name);
    else setCompanyName("Unknown");
  }, []);

  return (
    <>
      {companyName && (
        <ItemWrapper to={`${id}`} style={{ textDecoration: "none" }}>
          <ProductImg src={imgSrc} />
          <InfoWrapper>
            <Company>{companyName}</Company>
            <Price>{price}</Price>
          </InfoWrapper>
          <ProductName>{truncate(name)}</ProductName>
        </ItemWrapper>
      )}
    </>
  );
};

const ItemWrapper = styled(NavLink)`
  margin: 10px;
  color: var(--text-color);
  border: var(--light-gray-color) 0.25px solid;
  padding: 25px;
  border-radius: 8px;
  margin-right: auto;
  margin-left: auto;
  margin: 30px 10px 0px 10px;
`;

const ProductImg = styled.img`
  width: 210px;
  height: 210px;
  object-fit: contain;
  border-radius: 8px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 25px;
`;

const Company = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--main-color);
  padding: 2px;
  padding-top: 20px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--main-color);
  padding: 20px 7px 3px 3px;
`;

const ProductName = styled.span`
  display: flex;
  font-size: 16px;
  width: 225px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  padding: 2px;
  color: var(--main-color);
`;

export default GridProduct;
