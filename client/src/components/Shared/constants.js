import styled from "styled-components";

const HERO_IMAGE = "https://images.pexels.com/photos/2847648/pexels-photo-2847648.jpeg";

const Loading = () => {
  return (
    <>
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    </>
  );
};

const LoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Loader = styled.span`
  border: 5px solid white;
  border-top: 5px solid var(--main-color);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: loading 2s linear infinite;

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export { HERO_IMAGE, Loading };
