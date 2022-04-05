import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HERO_IMAGE } from "../Shared/constants";
import { JokkesContext } from "../Context/JokkesContext";

const Hero = () => {
  const goTo = useNavigate();
  const {
    hero: { setShowHeroPage },
  } = useContext(JokkesContext);

  // On click, disable hero page and show home page
  const goHome = () => {
    setShowHeroPage(false);
      goTo("/");
  };

  return (
    <Wrapper>
      <Logo>JoKKeS Wearables</Logo>
      <Divider />
      <Slogan>Less trouble than edibles</Slogan>
      <EnterButton onClick={goHome}>Start Shopping</EnterButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  background-image: url(${HERO_IMAGE});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  text-align: center;
  color: white;
  font-variant: small-caps;
  padding: 20px;
  > * {
    animation: slide 1s;
  }
  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateY(500px);
    }
    50% {
      opacity: 0.4;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Logo = styled.div`
  font-size: 84pt;
  font-weight: bold;
`;

const Divider = styled.hr`
  width: 75%;
  color: inherit;
  border: 2px solid currentColor;
  border-radius: 95%;
  margin: 10px;
`;

const Slogan = styled.div`
  font-size: 36pt;
`;

const EnterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 40px;
  font-size: 22pt;
  border-radius: 8px;
  border: none;
  background-color: var(--text-color);
  color: white;
  cursor: pointer;
  margin-top: 50px;
  transition: all 400ms ease-in-out;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

export default Hero;
