import { useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cart from "./Misc/Cart";
import Home from "./Home/Home";
import Shop from "./Shop/Shop";
import SingleProduct from "./Misc/SingleProduct";
import Complete from "./Misc/Complete";
import Checkout from "./Misc/Checkout";
import GlobalStyles from "./Shared/GlobalStyles";
import Page from "./Shared/Page";
import Hero from "./Misc/Hero";
import { JokkesContext } from "./Context/JokkesContext";

function App() {
  const {
    state: { allProducts, categories, companies },
    actions: { dispatchAction, ACTIONS },
    hero: { showHeroPage },
  } = useContext(JokkesContext);

  const goTo = useNavigate();
  useEffect(() => {
    console.log("App.js show hero page?", showHeroPage);
    if (showHeroPage) goTo("welcome");
  }, [showHeroPage]);

  useEffect(() => {
    if (allProducts == null) dispatchAction(ACTIONS.getProducts);
    if (categories == null) dispatchAction(ACTIONS.getCategories);
    if (companies == null) dispatchAction(ACTIONS.getCompanies);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/">
          <Route path="welcome" element={<Hero />} />
          <Route element={<Page />}>
            <Route index element={<Home />} />

            <Route path="shop">
              <Route index element={<Shop />} />
              <Route path=":itemId" element={<SingleProduct />} />
            </Route>

            <Route path="singleproduct" element={<SingleProduct />} />

            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="complete" element={<Complete />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
