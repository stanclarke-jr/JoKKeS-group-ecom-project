import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { JokkesContext } from "../Context/JokkesContext";
import CheckoutItem from "./CheckoutItem";

const Checkout = () => {
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({});

  const {
    actions: { dispatchAction, ACTIONS },
    state: { cart, total },
  } = useContext(JokkesContext);

  const goTo = useNavigate();

  useEffect(() => {
    dispatchAction(ACTIONS.updateTotal);
  }, []);

  const updateState = (myEvent) => {
    let tempState = formData;
    tempState[myEvent.target.name] = myEvent.target.value;
    setFormData({ ...tempState });
  };

  useEffect(() => {
    let isValid = true;
    if (Object.values(formData).length >= 11) {
      isValid = Object.entries(formData).every(([name, item]) => {
        if (name === "email") return item.includes("@");
        return item != null;
      });
    } else isValid = false;

    setDisabled(!isValid);
  }, [formData, disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderInfo = {
      _id: uuidv4(),
      ...formData,
    };
    const dispatchData = {
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderInfo),
      },
    };

    dispatchAction(ACTIONS.checkout, dispatchData);
  };

  return (
    <Wrapper>
      <MainHeader>Place your order</MainHeader>
      <FormContent onSubmit={handleSubmit}>
        <CartItems>
          {Object.entries(cart).map(([id, item]) => {
            return <CheckoutItem key={`checkout-${id}`} id={id} item={item} />;
          })}
        </CartItems>
        <Total>Total: ${total.toFixed(2)}</Total>
        <Divider />
        <H2>Please provide your information</H2>
        <OrderDetails>
          <ShippingAddress>
            <FlexContainer>
              <H3>Shipping Address</H3>
            </FlexContainer>
            <FlexContainer>
              <Label>
                <Input name="firstName" placeholder="First name" onChange={updateState} required />
              </Label>
              <Label>
                <Input name="lastName" placeholder="Last name" onChange={updateState} required />
              </Label>
            </FlexContainer>
            <FlexContainer>
              <Label>
                <Input name="address" placeholder="Street address" onChange={updateState} required />
              </Label>
              <Label>
                <Input name="city" placeholder="City" onChange={updateState} required />
              </Label>
            </FlexContainer>
            <FlexContainer>
              <Label>
                <Input name="province" placeholder="Province" onChange={updateState} required />
              </Label>
              <Label>
                <Input name="postalCode" placeholder="Postal Code" onChange={updateState} required />
              </Label>
            </FlexContainer>
            <FlexContainer>
              <Label>
                <Input name="country" placeholder="Country" onChange={updateState} />
              </Label>
              <Label>
                <Input type="email" name="email" placeholder="Email" onChange={updateState} required />
              </Label>
            </FlexContainer>
          </ShippingAddress>
          <Divider />
          <PaymentDetails>
            <FlexContainer>
              <H3>Please enter your payment details</H3>
            </FlexContainer>
            <FlexContainer>
              <Label>
                <Input placeholder="Credt card number" maxLength={16} onChange={updateState} required />
              </Label>
            </FlexContainer>
            <FlexContainer>
              <Label>
                <Input placeholder="Cardholder name" onChange={updateState} required />
              </Label>
            </FlexContainer>
            <FlexContainer>
              <Label>
                <Input placeholder="Expiration date - (mm/yy)" onChange={updateState} required />
              </Label>
            </FlexContainer>
          </PaymentDetails>
        </OrderDetails>
        <SubmitOrderButton type="submit" disabled={disabled}>
          Place your order!
        </SubmitOrderButton>
      </FormContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
`;

const CartItems = styled.div`
  display: flex;
  gap: 10px;
  flex-flow: column nowrap;
`;
const FormContent = styled.form`
  display: flex;
  flex-flow: column nowrap;
`;
const MainHeader = styled.h1`
  font-size: 44px;
  text-align: center;
  margin-bottom: 10px;
`;

const Divider = styled.div`
  border-top: 2px solid rgb(0 0 0 / 0.05);
  margin: 40px 0 20px 0;
`;

const H2 = styled.h2`
  margin: 40px 0 25px 0;
  text-align: center;
`;

const OrderDetails = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: flex-start;
`;
const Total = styled.p`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;
const ShippingAddress = styled.div`
  display: flex;
  flex-direction: column;
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const H3 = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0 15px 0;
  padding: 10px;
`;
const Label = styled.label`
  margin: 2px 5px;
`;
const Input = styled.input`
  font-size: 16px;
  font-style: italic;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 8px;
`;
const PaymentDetails = styled.div`
  margin: 0 0 10px 0;

  input {
    width: 275px;
  }
`;
const SubmitOrderButton = styled.button`
  align-self: center;
  color: white;
  background-color: var(--purple-color);
  font-size: 24px;
  font-weight: bold;
  border: 0px;
  border-radius: 10px;
  padding: 20px 20px;
  margin: 10px 0 100px 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: rgb(128 0 128 / 0.2);
  }
`;

export default Checkout;
