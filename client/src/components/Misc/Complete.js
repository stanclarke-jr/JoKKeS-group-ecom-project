import styled from "styled-components";

const Complete = () => {
  return <Wrapper>Order completed! Thank you for your order!</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  font-size: 32px;
  z-index: 4;
`;

export default Complete;
