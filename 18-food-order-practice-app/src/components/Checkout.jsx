import { useContext, useActionState } from "react";

import Modal from "./Modal";
import Error from "./Error";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { useHttp } from "../hooks/useHttp";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { UserProgressContext } from "../store/UserProgressContext";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const totalAmount = items.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  function handleClose() {
    hideCheckout();
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  async function checkoutAction(prev, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const street = formData.get("street");
    const postalCode = formData.get("postal-code");
    const city = formData.get("city");

    const errors = [];

    if (name.trim().split(" ").length < 2) {
      errors.push("Please enter a first and last name.");
    }
    if (!email.includes("@")) {
      errors.push("Please enter a valid email address.");
    }
    if (!street.trim()) {
      errors.push("You must enter in street address.");
    }
    if (!postalCode.trim()) {
      errors.push("Please enter a postal code.");
    }
    if (!city.trim()) {
      errors.push("You must enter a city.");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: { name, email, street, postalCode, city },
      };
    }
    await sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: {
            name,
            email,
            street,
            city,
            "postal-code": postalCode,
          },
        },
      })
    );
    return { errors: null };
  }

  const [formState, formAction, isSending] = useActionState(checkoutAction, {
    errors: null,
  });

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Close
      </Button>
      <Button disabled={isSending}>
        {isSending ? "Submitting..." : "Submit Order"}
      </Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was created successfully!</p>
        <p>
          We will get back to you with more details via email in the next few
          minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>
        <Input
          label="Full Name"
          type="text"
          id="name"
          defaultValue={formState.enteredValues?.name}
        />
        <Input
          label="E-Mail Address"
          type="email"
          id="email"
          defaultValue={formState.enteredValues?.email}
        />
        <Input
          label="Street"
          type="text"
          id="street"
          defaultValue={formState.enteredValues?.street}
        />
        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postal-code"
            defaultValue={formState.enteredValues?.postalCode}
          />
          <Input
            label="City"
            type="text"
            id="city"
            defaultValue={formState.enteredValues?.city}
          />
        </div>
        {formState.errors && (
          <div className="error">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </div>
        )}
        {error && (
          <Error title="Failed to submit order." message={error.message} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
