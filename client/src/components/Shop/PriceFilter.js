import styled from "styled-components";
import { useEffect, useContext } from "react";
import { JokkesContext } from "../Context/JokkesContext";

const PriceFilter = ({ toggleAscending }) => {
  const {
    actions: { dispatchAction, ACTIONS },
  } = useContext(JokkesContext);

  useEffect(() => {
    dispatchAction(ACTIONS.getCategories);
    dispatchAction(ACTIONS.getCompanies);
    dispatchAction(ACTIONS.getLocations);
  }, []);

  return (
    <Wrapper>
      <Select onChange={toggleAscending} defaultValue="none">
        <Option value="none" disabled>
          Sort by Price
        </Option>
        <Option value="increasing">Low to high</Option>
        <Option value="decreasing">High to low</Option>
      </Select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 140px;
  height: 40px;
`;

const Option = styled.option`
  width: 140px;
`;

const Select = styled.select`
  background-color: var(--purple-color);
  opacity: 70%;
  margin: 0px 10px 20px 10px;
  font-size: 15px;
  padding: 8px 16px;
  border-radius: 5px;
  color: white;
  width: 140px;
`;

export default PriceFilter;
