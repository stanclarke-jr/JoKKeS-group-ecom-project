import { NavLink } from "react-router-dom";
import styled from "styled-components";

const CategoryShop = ({ name, imageSrc }) => {
  return (
    <ImageWrapper>
      <NavLink to={`/shop?category=${name}`} style={{ textDecoration: "none" }}>
        <CategoryImg src={imageSrc} />
        <Label>{name}</Label>
      </NavLink>
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  min-width: 150px;
`;

const CategoryImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const Label = styled.div`
  font-size: 15.5px;
  font-weight: 900;
  margin: 8px 0px 10px 0px;
  text-align: center;
  color: var(--purple-color);
`;

export default CategoryShop;
