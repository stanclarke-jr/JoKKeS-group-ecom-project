import { Outlet } from "react-router-dom";
import Header from "./Header";

const Page = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Page;
