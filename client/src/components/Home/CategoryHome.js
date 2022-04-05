import { NavLink } from "react-router-dom";
import styled from "styled-components";

const CategoryHome = ({ name, imageSrc }) => {
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
  padding: 10px 10px 45px 10px;
  margin-left: auto;
  margin-right: auto;
`;

const Label = styled.div`
  font-size: 24px;
  font-weight: 900;
  margin-top: 8px;
  color: var(--purple-color);
`;

const CategoryImg = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

export default CategoryHome;
