import { useContext } from "react";

import Modal from "./Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import { UserProgressContext } from "../store/UserProgressContext";

export default function Cart() {
  const { items, updateQuantity } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  function handleClose() {
    hideCart();
  }
  function handleShowCheckout() {
    showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleClose : null}
    >
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onDecrease={() => updateQuantity(item.id, -1)}
              onIncrease={() => updateQuantity(item.id, 1)}
            />
          ))}
        </ul>
      )}
      <p className="cart-total">
        Cart Total: <strong>{currencyFormatter.format(totalPrice)}</strong>
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleShowCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
