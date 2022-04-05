import { createContext, useReducer, useState } from "react";
import usePersistedState from "../../hooks/usePersistedState.hook";


const JokkesContext = createContext(null);

const initialState = {
  categories: null,
  companies: null,
  allProducts: null,
  productsShown: null,
  currProduct: null,
  cart: {},
  order: null,
  total: 0,
  error: { status: false, attemptedAction: null, data: null },
  locations: null,
};

const ACTIONS = {
  getCategories: "getCategories",
  getProducts: "getProducts",
  getProductDetails: "getProductDetails",
  getCompanies: "getCompanies",
  getLocations: "getLocations",
  updateTotal: "updateTotal",
  addToCart: "addToCart",
  removeFromCart: "removeFromCart",
  checkout: "checkout",
  error: "error",
  filterProducts: "filterProducts",
};

const URLS = {
  getCategories: "/api/categories",
  getProducts: "/api/items",
  getProductDetails: "/api/items/:id",
  getCompanies: "/api/companies",
  checkout: "/api/checkout",
  getLocations: "/api/body-locations",
};

const myReducer = (state, action) => {
  const tempState = state;
  switch (action.type) {
    case ACTIONS.getLocations:
      tempState.locations = action.data; //array of locations
      break;
    case ACTIONS.getCategories:
      tempState.categories = action.data; //array of categories
      break;
    case ACTIONS.getProducts:
      tempState.allProducts = action.data; // array of products
      break;
    case ACTIONS.filterProducts:
      //action.filters = {companyId, category, body_location}
      let filtered = tempState.allProducts;
      for (const [filter, value] of Object.entries(action.data)) {
        //Ensure items shown match all filters.
        filtered = filtered.filter((item) => item[filter].toLowerCase() === value.toLowerCase());
      }
      tempState.productsShown = filtered; // array of products
      break;
    case ACTIONS.getProductDetails:
      tempState.currProduct = action.data; // object of single item
      break;
    case ACTIONS.getCompanies:
      tempState.companies = action.data; // array of companies
      break;
    case ACTIONS.updateTotal: //get all items from cart. return sum of their prices.
      let sum = 0;
      for (const item of Object.values(tempState.cart)) {
        sum += item.qty * Number(item.price.substring(1));
      }
      tempState.total = sum;
      break;
    case ACTIONS.addToCart:
      //action = { id: <itemID>, qty: <qtyToAdd> } || Find matching item:
      let itemToAdd = tempState.currProduct ?? tempState.allProducts.filter((prod) => prod._id == action.data.id);
      //Add item info to cart.
      // For each item, NAME - IMAGE - PRICE - QTY
      //If item already in cart, increment qty. Max Qty

      if (Object.keys(tempState.cart).includes(action.data.id)) {
        //max qty

        tempState.cart[action.data.id].qty = action.data.qty;

        tempState.cart[action.data.id].priceForQty = Number(tempState.cart[action.data.id].price.substring(1)) * Number(tempState.cart[action.data.id].qty);
      } else {
        //max qty.
        tempState.cart[action.data.id] = {
          qty: action.data.qty,
          name: itemToAdd.name,
          price: itemToAdd.price,
          priceForQty: Number(itemToAdd.price.substring(1)) * action.data.qty,
          imageSrc: itemToAdd.imageSrc,
          numInStock: itemToAdd.numInStock,
        };
      }
      break;
    case ACTIONS.removeFromCart:
      //action.data = { id: <itemID>, qty: <qtyToRemove> } || Find matching item:
      let itemToRemove = tempState.cart[action.data.id];
      if ((action.data.qty = "all")) delete tempState.cart[action.data.id];
      else tempState.cart[action.data.id].qty -= action.data.qty;
      break;
    case ACTIONS.checkout:
      tempState.order = action.data; //Order details
      break;
    case ACTIONS.error:
      tempState.error.status = true;
      tempState.error.attemptedAction = action.attemptedAction;
      tempState.error.data = action.data;
      break;
    default:
      break;
  }

  return { ...tempState };
};

const JokkesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(myReducer, initialState);
  const [serverResponse, setServerResponse] = useState(null);
  const [showHeroPage, setShowHeroPage] = usePersistedState(true, "showHero");

  //data = { id, fetchOptions}
  const dispatchAction = async (action, data = {}) => {
    //console.log(`%cDispatching ${action} with data:`, "color: purple", data);
    //does action have a URL for server requests?
    if (URLS[action]) {
      //get action endpoint
      let url = URLS[action];
      //add PATH parameters to url if needed
      if (url.includes(":id")) url = url.replace(":id", data.id);
      //get Server data
      //console.log("URL", url);

      //fetchOPtions?
      let options = data.fetchOptions || {};
      //console.log("FETCH options", options);

      const serverData = await getServerData(url, options);
      //console.log(`Got data from ${url}`, serverData);

      setServerResponse({
        type: action,
        data: serverData.data,
        res: serverData,
      });

      //on error, dispatch error event
      if (serverData.error) {
        dispatch({ type: ACTIONS.error, data: serverData, attemptedAction: action });
      } else dispatch({ type: action, data: serverData.data, res: serverData });
      //console.log("%cDISPATCH complete > server", "color: green", serverData);
      return serverData;
    } else {
      //no server data needed? regular dispatch
      dispatch({ type: action, data });
      //console.log("%cDISPATCH complete > state", "color: green", state);
      return data;
    }
  };

  const getServerData = async (url, options) => {
    return await fetch(url, options)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {
        console.log("%cFETCH ERROR", "color: red", err);
        return { status: "error", err };
      })
      .finally((result) => result);
  };

  return (
    <>
      <JokkesContext.Provider
        value={{
          state,
          hero: { showHeroPage, setShowHeroPage },
          server: { serverResponse, setServerResponse },
          actions: { getServerData, dispatchAction, ACTIONS },
        }}
      >
        {children}
      </JokkesContext.Provider>
    </>
  );
};

export { JokkesContext, JokkesProvider };
