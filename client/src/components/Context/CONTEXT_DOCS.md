# JoKKeS Context

The JoKKeS context contains multiple the data needed to correctly render site content. To access and modify data please use the reference below to ensure correct use.

## The \<state\>

The state contains the following properties:

### Categories

**Accessor:** `const { state: { categories }} = useContext(JokkesContext);`

**Initial State:** `null`

**To populate:** (_getCategories_)

```js
const {
  actions: { dispatchAction, ACTIONS },
} = useContext(JokkesContext);
useEffect(() => {
  dispatchAction(ACTIONS.getCategories);
});
```

**Populated State:** (Array of Objects)

```js
[
	{
		_id: "c70bc8a8-17f3-4e55-b760-8d45dfd80897",
		category: "Fitness",
		name:"Fitness",
		imageSrc: "/assets/fitness.jpg",
	},
	...
]
```

---

### Companies

**Accessor:** `const { state: { companies }} = useContext(JokkesContext);`

**Initial State:** `null`

**To populate:** (_getCompanies_)

```js
const {
  actions: { dispatchAction, ACTIONS },
} = useContext(JokkesContext);
useEffect(() => {
  dispatchAction(ACTIONS.getCompanies);
});
```

**Populated State:** (Array of Objects)

```js
[
	{
		_id: 19962,
		name:"Barska",
		url: "http://www.barska.com/",
		country: "United States"
	},
	...
]
```

---

### Body Locations

**Accessor:** `const { state: { locations }} = useContext(JokkesContext);`

**Initial State:** `null`

**To populate:** (_getLocations_)

```js
const {
  actions: { dispatchAction, ACTIONS },
} = useContext(JokkesContext);
useEffect(() => {
  dispatchAction(ACTIONS.getLocations);
});
```

**Populated State:** (Array of Objects)

```js
[
	{
		_id: "8827d5b7-51ec-47af-ac47-579c04bdb561",
		body_location: "Wrist",
		name:"Wrist",
	}
	...
]
```

---

### Products

#### All Products vs Filtered Products

**Accessors:** `const { state: { allProducts, productsShown }} = useContext(JokkesContext);`

**Initial State:** `null`

**To populate:** (_getProducts, filterProducts_)

```js
const {
  actions: { dispatchAction, ACTIONS },
} = useContext(JokkesContext);
useEffect(() => {
  dispatchAction(ACTIONS.getProducts); //Get all products
  //Filter products (company, category, body_location)
  dispatchAction(ACTIONS.filterProducts, { category: "fitness" }); //example
});
```

**Populated State:** Both will be in the same format (Array of Objects)

```js
[
	{
		_id: 6543,
		name: "Barska GB12166 Fitness Watch with Heart Rate Monitor",
		price: "$49.99",
		imageSrc: "data:image/jpeg;base64...",
		numInStock: 9,
		qty: 1,
	}
	...
]
```

#### Single Product Details

**Accessors:** `const { state: { currProduct }} = useContext(JokkesContext);`

**Initial State:** `null`

**To populate:** (_getProductDetails_)

```js
const {
  actions: { dispatchAction, ACTIONS },
} = useContext(JokkesContext);
useEffect(() => {
  dispatchAction(ACTIONS.getProductDetails, { id: 6543 }); //Pass the ID as well!!
});
```

**Populated State:** (Object)

```js
{
	_id: 6543,
	name: "Barska GB12166 Fitness Watch with Heart Rate Monitor",
	price: "$49.99",
	imageSrc: "data:image/jpeg;base64...",
	numInStock: 9,
	qty: 1,
}
```

---

### Cart

**Accessors:** `const { state: { cart, total }} = useContext(JokkesContext);`

**Initial State:** `null`

**To populate:** (_addToCart, removeFromCart, updateTotal_)

```js
const {
  actions: { dispatchAction, ACTIONS },
} = useContext(JokkesContext);
useEffect(() => {
  dispatchAction(ACTIONS.addToCart, { id: 6543, qty: 1 }); //Pass ID and Qty!
  dispatchAction(ACTIONS.removeFromCart, { id: 6543, qty: 1 }); //Pass ID and Qty!
  dispatchAction(ACTIONS.updateTotal); //Don't forget to update the cart's total!
});
```

**Populated State:** Object of Objects. Item ID is the key

```js
{
	6543: {
		name: "Barska GB12166 Fitness Watch with Heart Rate Monitor",
		price: "$49.99",
		priceForQty: "$79.99",
		imageSrc: "data:image/jpeg;base64...",
		numInStock: 9,
		qty: 1,
	}
	...
}
```
